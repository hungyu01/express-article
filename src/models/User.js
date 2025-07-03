const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const BaseModel = require('../bases/BaseModel');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'username must be at least 3 characters'],
        maxlength: [30, 'username must be less than 30 characters']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [6, 'password must be at least 6 characters']
    },
    firstName: {
        type: String,
        required: [true, 'first name is required'],
        trim: true,
        maxlength: [50, 'first name must be less than 50 characters']
    },
    lastName: {
        type: String,
        required: [true, 'last name is required'],
        trim: true,
        maxlength: [50, 'last name must be less than 50 characters']
    },

    // account status
    isActive: {
        type: Boolean,
        default: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    deleted_at: {
        type: Date,
        default: null
    },
    // login related
    last_login_at: {
        type: Date,
        default: null
    },
    login_attempts: {
        type: Number,
        default: 0
    },
    lock_until: {
        type: Date,
        default: null
    }
});

// virtual field: full name
userSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

// password encryption middleware
userSchema.pre('save', async function(next) {
    // only re-encrypt when password is modified
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// password verification method
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// check if account is locked
userSchema.methods.isLocked = function() {
    return !!(this.lockUntil && this.lockUntil > Date.now());
};

// increase login attempts
userSchema.methods.incLoginAttempts = function() {
    // if account is locked, reset login attempts
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return this.updateOne({
            $unset: { lockUntil: 1 },
            $set: { loginAttempts: 1 }
        });
    }
    
    const updates = { $inc: { loginAttempts: 1 } };
    
    // if max login attempts reached, lock account
    if (this.loginAttempts + 1 >= 5 && !this.isLocked()) {
        updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // lock for 2 hours
    }
    
    return this.updateOne(updates);
};

// reset login attempts
userSchema.methods.resetLoginAttempts = function() {
    return this.updateOne({
        $unset: { loginAttempts: 1, lockUntil: 1 },
        $set: { lastLoginAt: new Date() }
    });
};

// soft delete method
userSchema.methods.softDelete = function() {
    this.isDeleted = true;
    this.deletedAt = new Date();
    this.isActive = false;
    return this.save();
};

// restore account method
userSchema.methods.restore = function() {
    this.isDeleted = false;
    this.deletedAt = null;
    this.isActive = true;
    return this.save();
};

// query middleware: exclude deleted users
userSchema.pre(/^find/, function(next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

module.exports = mongoose.model('User', userSchema); 