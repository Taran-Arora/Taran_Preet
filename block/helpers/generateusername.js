const crypto = require('crypto');

exports.generateUsename = async() => {
    // Generate a random number or hash
    const randomPart = crypto.randomBytes(4).toString('hex'); // Adjust the number of bytes as needed

    // Concatenate with a fixed string (e.g., 'user')
    const username = `user_${randomPart}`;

    return username;
}
