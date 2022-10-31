require('dotenv').config();
module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: process.env.mypassword,
    DB: 'JOB',
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 600000,
      idle: 10000
    }
  };