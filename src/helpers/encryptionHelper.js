const crypto = require('crypto');
const key = process.env.HASH_KEY;

function hashStringWithKey(string) {
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(string);
    const hashedString = hmac.digest('hex');
    return hashedString;
}

module.exports = {
    hashStringWithKey
};