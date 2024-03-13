module.exports = async function createSampleBudgtData(db) {

    let budgetSections = [
        { name: "Income", description: "Income", direction: "in" },
        { name: "Expenses", description: "Expenses", direction: "out" }
    ];

    let budgetCategories = [
        { name: "Employment Income", description: "Employment Income", sectionName: "Income" },
        { name: "Other Income", description: "Bonuses, gifts, etc.", sectionName: "Income" },

        { name: "Necessary", description: "Tithing, rent, utitilites, food, etc.", sectionName: "Expenses" },
        { name: "Important", description: "Phones, internet, etc.", sectionName: "Expenses" },
        { name: "Fun", description: "Entertainment, treats, etc.", sectionName: "Expenses" },
        { name: "Irregular", description: "Car/home maintance, holidays, etc.", sectionName: "Expenses" }
    ];

    let budgetAccounts = [
        { name: "Paycheque", description: "Paycheque", categoryName: "Employment Income", amount: 5280.00, type: "min", method: "Automatic" },
        { name: "Other Income", description: "Other Income", categoryName: "Other Income", amount: 0.00, type: "min", method: "Ad hoc" },

        { name: "Rent", description: "Rent", categoryName: "Necessary", amount: 1700.00, type: "fix", method: "Post-dated cheques" },
        { name: "Electricity", description: "Enmax", categoryName: "Necessary", amount: 340.00, type: "est", method: "PAD" },
        { name: "Natural Gas", description: "Direct Energy", categoryName: "Necessary", amount: 100.00, type: "est", method: "Automated bill payment" },
        { name: "Groceries", description: "Groceries", categoryName: "Necessary", amount: 200.00, type: "max", method: "Debit" },

        { name: "Charity", description: "Charity donation", categoryName: "Important", amount: 100.00, type: "fix", method: "Church website" },
        { name: "Dates", description: "Dates", categoryName: "Important", amount: 100.00, type: "max", method: "Debit" },
        { name: "Allowance", description: "Allowance", categoryName: "Important", amount: 100.00, type: "fix", method: "Automated transfer" },

        { name: "Entertainment", description: "Concerts, plays, movies, etc.", categoryName: "Fun", amount: 100.00, type: "avg", method: "TD Cashback" },

        { name: "Car Maintenance", description: "Oil changes, winter tires, etc.", categoryName: "Irregular", amount: 50.00, type: "fix", method: "Automated transfer" },
        { name: "Home Maintenance", description: "Home & yard function & beauty", categoryName: "Irregular", amount: 50.00, type: "max", method: "Debit" },
    ];

    await Promise.all(
        budgetSections.map(async section => {
            let data = await db.budgetSections.create({
                name: section.name,
                description: section.description,
                direction: section.direction
            });
            section.id = data.id;
        })
    );

    await Promise.all(
        budgetCategories.map(async category => {
            let section = budgetSections.find(section => section.name === category.sectionName);
            let data = await db.budgetCategories.create({
                name: category.name,
                description: category.description,
                section_id: section.id,
            });
            category.id = data.id;
        })
    );

    await Promise.all(
        budgetAccounts.map(async account => {
            let category = budgetCategories.find(category => category.name === account.categoryName);
            let data = await db.budgetAccounts.create({
                name: account.name,
                description: account.description,
                category_id: category.id,
                amount: account.amount,
                type: account.type,
                method: account.method
            });
        })
    );
}