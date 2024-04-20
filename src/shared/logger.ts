import winston from 'winston';
import 'winston-mongodb';
import config from '../config';

const MongoTransport = new winston.transports.MongoDB({
  db: config.database_url as string,
  collection: 'logs',
  options: { useUnifiedTopology: true },
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
});

const ConsoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  ),
});

export const logger = winston.createLogger({
  transports: [ConsoleTransport, MongoTransport],
});

// if (config.node_env !== 'production') {
//   logger.remove(MongoTransport);
// }
