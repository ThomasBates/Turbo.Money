
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

require("./src/app")(app);
