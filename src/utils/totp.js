const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

// generate TOTP Secret
const generateTOTPSecret = (username, issuer = 'Express Web API') => {
    const secret = speakeasy.generateSecret({
        name: `${issuer}:${username}`,
        issuer: issuer,
        length: 20
    });
    
    return {
        secret: secret.base32,
        otpauth_url: secret.otpauth_url
    };
};

// generate QR Code
const generateQRCode = async (otpauthUrl) => {
    try {
        const qrCodeDataURL = await QRCode.toDataURL(otpauthUrl);
        return qrCodeDataURL;
    } catch (error) {
        throw new Error('Failed to generate QR code');
    }
};

// verify TOTP Token
const verifyTOTPToken = (token, secret) => {
    return speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: token,
        window: 2 // allow 2 time windows
    });
};

// generate TOTP Token (for testing)
const generateTOTPToken = (secret) => {
    return speakeasy.totp({
        secret: secret,
        encoding: 'base32'
    });
};

module.exports = {
    generateTOTPSecret,
    generateQRCode,
    verifyTOTPToken,
    generateTOTPToken
}; 