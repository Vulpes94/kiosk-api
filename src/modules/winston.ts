import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf((info) => {
      if (Array.isArray(info.message)) {
        return `[${info.level}] ${info.timestamp}: \n${JSON.stringify(info.message, null, 2)} \n`;
      } else {
        return `[${info.level}] ${info.timestamp}: ${info.message}`;
      }
    }),
  ),
  transports: [
    new transports.File({ filename: './logs/access.log', level: 'info' }),
    new transports.File({ filename: './logs/errors.log', level: 'error' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.colorize(),
        format.printf((info) => {
          if (Array.isArray(info.message)) {
            return `[${info.level}] ${info.timestamp}: \n${JSON.stringify(
              info.message,
              null,
              2,
            )} \n`;
          } else {
            return `[${info.level}] ${info.timestamp}: ${info.message}`;
          }
        }),
      ),
    }),
  );
}

export const stream = {
  write: (message: string) => logger.info(message),
};

export default logger;
