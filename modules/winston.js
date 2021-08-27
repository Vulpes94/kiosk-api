const { createLogger, format, transports } = require('winston');

const winston = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    (loggerFormat = format.printf((info) => {
      if (Array.isArray(info.message)) {
        return `[${info.level}] ${info.timestamp}: \n${JSON.stringify(info.message, null, 2)} \n`;
      } else {
        return `[${info.level}] ${info.timestamp}: ${info.message}`;
      }
    })),
  ),
  transports: [
    new transports.File({ filename: './logs/access.log', level: 'info' }),
    new transports.File({ filename: './logs/errors.log', level: 'error' }),
  ],
});

winston.stream = {
  write: (message) => winston.info(message),
};

if (process.env.NODE_ENV !== 'production') {
  winston.add(
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.colorize(),
        (loggerFormat = format.printf((info) => {
          if (Array.isArray(info.message)) {
            return `[${info.level}] ${info.timestamp}: \n${JSON.stringify(
              info.message,
              null,
              2,
            )} \n`;
          } else {
            return `[${info.level}] ${info.timestamp}: ${info.message}`;
          }
        })),
      ),
    }),
  );
}

module.exports = winston;
