const mongoose = require('mongoose');
const BaseModel = require('../bases/BaseModel');

const totpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    secret: {
        type: String,
        required: true
    },
    isEnabled: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    backupCodes: [{
        code: String,
        isUsed: {
            type: Boolean,
            default: false
        },
        usedAt: Date
    }],
    lastUsedAt: {
        type: Date,
        default: null
    },
    failedAttempts: {
        type: Number,
        default: 0
    },
    lockedUntil: {
        type: Date,
        default: null
    }
});

// Check if TOTP is locked
totpSchema.methods.isLocked = function() {
    return !!(this.lockedUntil && this.lockedUntil > Date.now());
};

// Increment failed attempts
totpSchema.methods.incrementFailedAttempts = function() {
    this.failedAttempts += 1;
    
    // Lock after 5 failed attempts for 15 minutes
    if (this.failedAttempts >= 5) {
        this.lockedUntil = new Date(Date.now() + 15 * 60 * 1000);
    }
    
    return this.save();
};

// Reset failed attempts
totpSchema.methods.resetFailedAttempts = function() {
    this.failedAttempts = 0;
    this.lockedUntil = null;
    this.lastUsedAt = new Date();
    return this.save();
};

// Generate backup codes
totpSchema.methods.generateBackupCodes = function() {
    const codes = [];
    for (let i = 0; i < 10; i++) {
        codes.push({
            code: Math.random().toString(36).substring(2, 8).toUpperCase(),
            isUsed: false
        });
    }
    this.backupCodes = codes;
    return this.save();
};

// Use backup code
totpSchema.methods.useBackupCode = function(code) {
    const backupCode = this.backupCodes.find(bc => bc.code === code && !bc.isUsed);
    if (backupCode) {
        backupCode.isUsed = true;
        backupCode.usedAt = new Date();
        return this.save();
    }
    return false;
};

module.exports = mongoose.model('TOTP', totpSchema); 