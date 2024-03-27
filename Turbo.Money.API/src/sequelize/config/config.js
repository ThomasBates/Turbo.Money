
module.exports = {
  "development": {
    "host":     process.env.DB_DEV_HOST,
    "database": process.env.DB_DEV_DATABASE,
    "username": process.env.DB_DEV_USERNAME,
    "password": process.env.DB_DEV_PASSWORD,
    "dialect": "mysql",
  },
  "test": {
    "host":     process.env.DB_TEST_HOST,
    "database": process.env.DB_TEST_DATABASE,
    "username": process.env.DB_TEST_USERNAME,
    "password": process.env.DB_TEST_PASSWORD,
    "dialect": "mysql"
  },
  "production": {
    "host":     process.env.DB_PROD_HOST,
    "database": process.env.DB_PROD_DATABASE,
    "username": process.env.DB_PROD_USERNAME,
    "password": process.env.DB_PROD_PASSWORD,
    "dialect": "mysql"
  }
}
