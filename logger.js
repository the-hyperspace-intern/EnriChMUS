const colors = require('colors/safe');

const moment = require('moment');
const tsFormat = () => colors.gray(moment().format('YYYY-MM-DD hh:mm:ss').trim());
const { createLogger, format, transports } = require('winston');
const logger = createLogger({
    level: 'debug',
    format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.printf(info => ` [${info.level}]: ${info.message} ${tsFormat()}`)
    ),
    transports: [new transports.Console()]
});

module.exports = logger;