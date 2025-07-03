const { TOTP } = require('../models');
const { generateTOTPSecret, generateQRCode, verifyTOTPToken } = require('../utils/totp');

class TOTPController {
    // Setup TOTP
    async setup(req, res) {
        try {
            const user = req.user;

            // Check if TOTP is already set up
            let totpRecord = await TOTP.findOne({ userId: user._id });
            if (totpRecord && totpRecord.isEnabled) {
                return res.status(400).json({
                    message: 'TOTP is already enabled',
                    status: 'error'
                });
            }

            // Generate TOTP secret
            const totpData = generateTOTPSecret(user.username);
            
            // Generate QR Code
            const qrCode = await generateQRCode(totpData.otpauth_url);

            // Create or update TOTP record
            if (!totpRecord) {
                totpRecord = new TOTP({
                    userId: user._id,
                    secret: totpData.secret
                });
            } else {
                totpRecord.secret = totpData.secret;
                totpRecord.isEnabled = false;
                totpRecord.isVerified = false;
            }

            // Generate backup codes
            await totpRecord.generateBackupCodes();
            await totpRecord.save();

            res.json({
                message: 'TOTP setup completed',
                status: 'success',
                data: {
                    secret: totpData.secret,
                    qrCode,
                    otpauthUrl: totpData.otpauth_url,
                    backupCodes: totpRecord.backupCodes.map(bc => bc.code)
                }
            });
        } catch (error) {
            res.status(500).json({
                message: 'TOTP setup failed',
                status: 'error',
                error: error.message
            });
        }
    }

    // Verify and enable TOTP
    async verify(req, res) {
        try {
            const { token } = req.body;
            const user = req.user;

            const totpRecord = await TOTP.findOne({ userId: user._id });
            if (!totpRecord) {
                return res.status(400).json({
                    message: 'Please set up TOTP first',
                    status: 'error'
                });
            }

            if (totpRecord.isLocked()) {
                return res.status(423).json({
                    message: 'TOTP is temporarily locked due to too many failed attempts',
                    status: 'error'
                });
            }

            // Verify TOTP token
            const isValid = verifyTOTPToken(token, totpRecord.secret);
            if (!isValid) {
                await totpRecord.incrementFailedAttempts();
                return res.status(400).json({
                    message: 'TOTP verification code is incorrect',
                    status: 'error'
                });
            }

            // Enable TOTP
            totpRecord.isEnabled = true;
            totpRecord.isVerified = true;
            await totpRecord.resetFailedAttempts();

            res.json({
                message: 'TOTP enabled successfully',
                status: 'success'
            });
        } catch (error) {
            res.status(500).json({
                message: 'TOTP verification failed',
                status: 'error',
                error: error.message
            });
        }
    }

    // Disable TOTP
    async disable(req, res) {
        try {
            const { password } = req.body;
            const user = req.user;

            // Verify password
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                return res.status(400).json({
                    message: 'Password is incorrect',
                    status: 'error'
                });
            }

            // Disable TOTP
            await TOTP.findOneAndDelete({ userId: user._id });

            res.json({
                message: 'TOTP disabled successfully',
                status: 'success'
            });
        } catch (error) {
            res.status(500).json({
                message: 'TOTP disable failed',
                status: 'error',
                error: error.message
            });
        }
    }

    // Get TOTP status
    async getStatus(req, res) {
        try {
            const user = req.user;

            const totpRecord = await TOTP.findOne({ userId: user._id });
            
            res.json({
                message: 'Get TOTP status successful',
                status: 'success',
                data: {
                    isEnabled: totpRecord ? totpRecord.isEnabled : false,
                    isVerified: totpRecord ? totpRecord.isVerified : false,
                    hasBackupCodes: totpRecord ? totpRecord.backupCodes.length > 0 : false,
                    unusedBackupCodes: totpRecord ? totpRecord.backupCodes.filter(bc => !bc.isUsed).length : 0
                }
            });
        } catch (error) {
            res.status(500).json({
                message: 'Get TOTP status failed',
                status: 'error',
                error: error.message
            });
        }
    }

    // Generate new backup codes
    async generateBackupCodes(req, res) {
        try {
            const { password } = req.body;
            const user = req.user;

            // Verify password
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                return res.status(400).json({
                    message: 'Password is incorrect',
                    status: 'error'
                });
            }

            const totpRecord = await TOTP.findOne({ userId: user._id });
            if (!totpRecord || !totpRecord.isEnabled) {
                return res.status(400).json({
                    message: 'TOTP is not enabled',
                    status: 'error'
                });
            }

            // Generate new backup codes
            await totpRecord.generateBackupCodes();

            res.json({
                message: 'Backup codes generated successfully',
                status: 'success',
                data: {
                    backupCodes: totpRecord.backupCodes.map(bc => bc.code)
                }
            });
        } catch (error) {
            res.status(500).json({
                message: 'Generate backup codes failed',
                status: 'error',
                error: error.message
            });
        }
    }

    // Verify backup code
    async verifyBackupCode(req, res) {
        try {
            const { backupCode } = req.body;
            const user = req.user;

            const totpRecord = await TOTP.findOne({ userId: user._id });
            if (!totpRecord || !totpRecord.isEnabled) {
                return res.status(400).json({
                    message: 'TOTP is not enabled',
                    status: 'error'
                });
            }

            // Use backup code
            const success = await totpRecord.useBackupCode(backupCode);
            if (!success) {
                return res.status(400).json({
                    message: 'Invalid or used backup code',
                    status: 'error'
                });
            }

            res.json({
                message: 'Backup code verified successfully',
                status: 'success'
            });
        } catch (error) {
            res.status(500).json({
                message: 'Backup code verification failed',
                status: 'error',
                error: error.message
            });
        }
    }
}

module.exports = new TOTPController(); 