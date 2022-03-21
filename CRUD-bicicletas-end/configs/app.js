const dotenv = require('dotenv');
dotenv.config();

const appConfig = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3306,
}

module.exports = appConfig;