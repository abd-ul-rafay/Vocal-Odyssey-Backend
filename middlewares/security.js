const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');

module.exports = (app) => {
  // Set security HTTP headers
  app.use(helmet());

  // Sanitize request data
  app.use(hpp());
  app.use(mongoSanitize());

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
  });
  app.use(limiter);
};
