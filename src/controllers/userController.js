const { User } = require('../models');
const { generateToken } = require('../utils/jwt');

class UserController {
    // user registration
    async register(req, res) {
        try {
            const { username, email, password, firstName, lastName } = req.body;

            // check if user already exists
            const existingUser = await User.findOne({
                $or: [{ email }, { username }]
            });

            if (existingUser) {
                return res.status(400).json({
                    message: 'User name or email already exists',
                    status: 'error'
                });
            }

            // create new user
            const user = new User({
                username,
                email,
                password,
                firstName,
                lastName
            });

            await user.save();

            // generate JWT token
            const token = generateToken(user._id);

            res.status(201).json({
                message: 'Registration successful',
                status: 'success',
                data: {
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        fullName: user.fullName
                    },
                    token
                }
            });
        } catch (error) {
            res.status(500).json({
                message: 'Registration failed',
                status: 'error',
                error: error.message
            });
        }
    }

    // user login
    async login(req, res) {
        try {
            const { username, password } = req.body;

            // find user
            const user = await User.findOne({
                $or: [{ username }, { email: username }]
            });

            if (!user) {
                return res.status(401).json({
                    message: 'Username or password is incorrect',
                    status: 'error'
                });
            }

            // check if account is locked
            if (user.isLocked()) {
                return res.status(423).json({
                    message: 'Account is locked, please try again later',
                    status: 'error'
                });
            }

            // verify password
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                await user.incLoginAttempts();
                return res.status(401).json({
                    message: 'Username or password is incorrect',
                    status: 'error'
                });
            }



            // reset login attempts
            await user.resetLoginAttempts();

            // generate JWT token
            const token = generateToken(user._id);

            res.json({
                message: 'Login successful',
                status: 'success',
                data: {
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        fullName: user.fullName,
                        totpEnabled: user.totpEnabled
                    },
                    token
                }
            });
        } catch (error) {
            res.status(500).json({
                message: 'Login failed',
                status: 'error',
                error: error.message
            });
        }
    }

    // user logout
    async logout(req, res) {
        res.json({
            message: 'Logout successful',
            status: 'success'
        });
    }

    // get user profile
    async getProfile(req, res) {
        try {
            const user = req.user;
            res.json({
                message: 'Get user profile successful',
                status: 'success',
                data: {
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        fullName: user.fullName,
                        totpEnabled: user.totpEnabled,
                        totpVerified: user.totpVerified,
                        createdAt: user.createdAt,
                        lastLoginAt: user.lastLoginAt
                    }
                }
            });
        } catch (error) {
            res.status(500).json({
                message: 'Get user profile failed',
                status: 'error',
                error: error.message
            });
        }
    }

    // update user profile
    async updateProfile(req, res) {
        try {
            const { firstName, lastName, email } = req.body;
            const user = req.user;

            // check if email is already used by another user
            if (email && email !== user.email) {
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    return res.status(400).json({
                        message: 'Email is already used',
                        status: 'error'
                    });
                }
            }

            // update user profile
            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            user.email = email || user.email;

            await user.save();

            res.json({
                message: 'Update user profile successful',
                status: 'success',
                data: {
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        fullName: user.fullName
                    }
                }
            });
        } catch (error) {
            res.status(500).json({
                message: 'Update user profile failed',
                status: 'error',
                error: error.message
            });
        }
    }

    // change password
    async changePassword(req, res) {
        try {
            const { currentPassword, newPassword } = req.body;
            const user = req.user;

            // 驗證當前密碼
            const isCurrentPasswordValid = await user.comparePassword(currentPassword);
            if (!isCurrentPasswordValid) {
                return res.status(400).json({
                    message: '當前密碼錯誤',
                    status: 'error'
                });
            }

            // update password
            user.password = newPassword;
            await user.save();

            res.json({
                message: 'Password changed successfully',
                status: 'success'
            });
        } catch (error) {
            res.status(500).json({
                message: '密碼更改失敗',
                status: 'error',
                error: error.message
            });
        }
    }



    // soft delete user
    async deleteAccount(req, res) {
        try {
            const { password } = req.body;
            const user = req.user;

            // verify password
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                return res.status(400).json({
                    message: 'Password is incorrect',
                    status: 'error'
                });
            }

            // soft delete user
            await user.softDelete();

            res.json({
                message: 'Account deleted successfully',
                status: 'success'
            });
        } catch (error) {
            res.status(500).json({
                message: 'Account deleted failed',
                status: 'error',
                error: error.message
            });
        }
    }
}

module.exports = new UserController(); 