
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
const loggerProvider = require("./lib/logger/loggerConsoleProvider")();
const logger = require("./lib/logger/logger")(loggerProvider);

const db = require("./app/sequelize/models")(logger);
const data = require("./app/sequelize/data")(logger, db);
const business = require("./app/business")(logger, data);
const controllers = require("./app/controllers")(logger, business);
require("./app/routes")(app, logger, controllers);
// -----------------------------------------------------------------------------

//logger.enableSeverity('verbose');
//logger.enableCategory('all');

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    logger.info('Server', `Server is running on port ${PORT}.`);
});