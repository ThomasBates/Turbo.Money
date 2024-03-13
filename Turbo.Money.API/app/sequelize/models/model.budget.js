module.exports = (db) => {
    const DataTypes = db.Sequelize.DataTypes;

    db.budget = {};

    //  budget_section  --------------------------------------------------------

    db.budget.section = db.sequelize.define("budget_section", {
        active_from: { type: DataTypes.DATE },
        active_to: { type: DataTypes.DATE },
        name: { type: DataTypes.STRING },
        description: { type: DataTypes.STRING },
        direction: { type: DataTypes.STRING },
        display_order: { type: DataTypes.INTEGER },
        tag: { type: DataTypes.STRING },
    }, { underscored: true });

    db.user.family.hasMany(db.budget.section, { as: 'budgetSection', foreignKey: 'user_family_id' });
    db.budget.section.belongsTo(db.user.family, { as: 'family', foreignKey: 'user_family_id' });

    //  budget_category  -------------------------------------------------------

    db.budget.category = db.sequelize.define("budget_category", {
        active_from: { type: DataTypes.DATE },
        active_to: { type: DataTypes.DATE },
        name: { type: DataTypes.STRING },
        description: { type: DataTypes.STRING },
        display_order: { type: DataTypes.INTEGER },
        tag: { type: DataTypes.STRING },
    }, { underscored: true });

    db.user.family.hasMany(db.budget.category, { as: 'budgetCategory', foreignKey: 'user_family_id' });
    db.budget.category.belongsTo(db.user.family, { as: 'family', foreignKey: 'user_family_id' });

    db.budget.section.hasMany(db.budget.category, { as: 'category', foreignKey: 'budget_section_id' });
    db.budget.category.belongsTo(db.budget.section, { as: 'section', foreignKey: 'budget_section_id' });

    //  budget_account  --------------------------------------------------------

    db.budget.account = db.sequelize.define("budget_account", {
        active_from: { type: DataTypes.DATE },
        active_to: { type: DataTypes.DATE },
        name: { type: DataTypes.STRING },
        description: { type: DataTypes.STRING },
        amount: { type: DataTypes.DECIMAL(10, 2).UNSIGNED },
        type: { type: DataTypes.STRING },
        method: { type: DataTypes.STRING },
        display_order: { type: DataTypes.INTEGER },
        tag: { type: DataTypes.STRING },
    }, { underscored: true });

    db.user.family.hasMany(db.budget.account, { as: 'budgetAccount', foreignKey: 'user_family_id' });
    db.budget.account.belongsTo(db.user.family, { as: 'family', foreignKey: 'user_family_id' });

    db.budget.category.hasMany(db.budget.account, { as: 'account', foreignKey: 'budget_category_id' });
    db.budget.account.belongsTo(db.budget.category, { as: 'category', foreignKey: 'budget_category_id' });
}

