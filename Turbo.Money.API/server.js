
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
const loggerProvider = require("./src/lib/logger/loggerConsoleProvider")();
const logger = require("./src/lib/logger/logger")(loggerProvider);

logger.enableSeverity('verbose');
logger.enableCategory('all');

const db = require("./src/sequelize")(logger);
const data = require("./src/sequelize/data")(logger, db);
const business = require("./src/business")(logger, data);
const controllers = require("./src/controllers")(logger, business);
require("./src/routes")(app, logger, controllers);
// -----------------------------------------------------------------------------

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    logger.info('Server', `Server is running on port ${PORT}.`);
});