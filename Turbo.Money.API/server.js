
require("dotenv/config");
const express = require("express");
const cors = require("cors");

const app = express();

// Resolve CORS
var corsOptions = {
    origin: [
        process.env.CLIENT_URL_DEV,
        process.env.CLIENT_URL
    ],
    credentials: true,
};
app.use(cors(corsOptions));

// Parse Cookie
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// -----------------------------------------------------------------------------
// Bootstrapper:
const loggerProvider = require("./src/services/logger/loggerConsoleProvider")();
const logger = require("./src/services/logger/logger")(loggerProvider);
const errors = require("./src/services/errors/errors")(logger);

logger.enableSeverity('verbose');
logger.enableCategory('all');

const db = require("./src/sequelize")(logger);
const data = require("./src/sequelize/data")(logger, errors, db);
const business = require("./src/business")(logger, errors, data);
const controllers = require("./src/controllers")(logger, errors, business);
require("./src/routes")(app, logger, errors, controllers);
// -----------------------------------------------------------------------------

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    logger.info('Server', 'Server', `Server is running on port ${PORT}.`);
});