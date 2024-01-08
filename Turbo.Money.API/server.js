const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// Bootstrapper:
const db = require("./app/sequelize/models");
//db.initialize();
//db.sequelize.sync({ force: true })
//    .then(() => {
//        console.log("Drop and re-sync db.");
//    })
//    .catch((err) => {
//        console.log("Failed to sync db: ");
//        console.log(err);
//    });
const data = require("./app/sequelize/data")(db);
const business = require("./app/business")(data);
const controllers = require("./app/controllers")(business);

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Turbo Money." });
});

//require("./app/routes/bank.routes")(app, controllers.bank);
//require("./app/routes/tutorial.routes")(app, controllers.bankAccount);
require("./app/routes")(app, controllers);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});