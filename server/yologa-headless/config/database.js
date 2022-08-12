const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', 'yologa-mysql.cb0mup0inuqk.us-east-1.rds.amazonaws.com'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'yologa'),
      user: env('DATABASE_USERNAME', 'admin'),
      password: env('DATABASE_PASSWORD', 'mysql.yologa.dobugs.co.kr'),
      timezone: env('DATABASE_TIMEZONE', 'utf8bm4'),
    },
    useNullAsDefault: true,
  },
});
