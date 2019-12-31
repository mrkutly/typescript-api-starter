import dotenv from 'dotenv';
import winston, { format } from 'winston';

dotenv.config();

const Logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.simple(),
      ),
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug'
    }),
  ],

});

export default Logger;