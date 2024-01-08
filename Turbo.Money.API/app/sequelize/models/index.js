const dbConfig = require("../../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.banks = require("./BankModel.js")(sequelize, Sequelize);
db.bankAccounts = require("./BankAccountModel.js")(sequelize, Sequelize);
db.budgetCategories = require("./BudgetCategoryModel.js")(sequelize, Sequelize);
db.budgetAccounts = require("./BudgetAccountModel.js")(sequelize, Sequelize);

db.initialize = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log("Drop and re-sync db.");

        await db.prepopulate();
    } catch (err) {
        console.log("Failed to sync db: ");
        console.log(err);
    }
}

db.prepopulate = async () => {

    let banks = [
        { name: "National Bank", number: "001", transit: "00001" },
        { name: "Credit Card Company", number: "009", transit: "00009" }
    ];

    let bankAccounts = [
        { name: "Chequing", bankName: "National Bank", number: "9876543" },
        { name: "Savings", bankName: "National Bank", number: "6543210" },
        { name: "Credit Card", bankName: "Credit Card Company", number: "1234010012349876" }
    ];

    let budgetCategories = [{
        name: "Income",
        description: "Income",
        direction: "in"
    }, {
        name: "Necessities",
        description: "Tithing, rent, utitilites, food, etc.",
        direction: "out"
    }, {
        name: "Important",
        description: "Phones, internet, etc.",
        direction: "out"
    }, {
        name: "Irregular",
        description: "Car/home maintance, holidays, etc.",
        direction: "out"
    }];


    await Promise.all(
        banks.map(async bank => {
            let data = await db.banks.create({
                name: bank.name,
                number: bank.number,
                transit: bank.transit
            });
            bank.id = data.id;
        })
    );

    await Promise.all(
        bankAccounts.map(async account => {
            let bank = banks.find(bank => bank.name === account.bankName);
            await db.bankAccounts.create({
                name: account.name,
                bank_id: bank.id,
                number: account.number
            });
        })
    );

    await Promise.all(
        budgetCategories.map(async category => {
            let data = await db.budgetCategories.create({
                name: category.name,
                description: category.description,
                direction: category.direction
            });
            category.id = data.id;
        })
    );
};

module.exports = db;