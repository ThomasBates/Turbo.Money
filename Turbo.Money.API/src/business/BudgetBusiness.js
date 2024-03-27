
module.exports = function BudgetBusiness(logger, data) {

    const createSampleData = async (userCookie) => {

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

        return await data.createSampleData(userCookie,
            budgetSections, budgetCategories, budgetAccounts);
    };

    return {
        createSampleData,
    };
}
