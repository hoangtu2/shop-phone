const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, 'abc123xyz', { expiresIn: '5d' });
};

module.exports = generateToken;
