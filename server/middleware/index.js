const authMiddleware = require('./authMiddleware');
const errorMiddleware = require('./errorMiddleware');
const validationMiddleware = require('./validationMiddleware');
const rateLimiter = require('./rateLimiter');

module.exports = {
  ...authMiddleware,
  ...errorMiddleware,
  ...validationMiddleware,
  ...rateLimiter,
};
