module.exports = (db) => {
    const DataTypes = db.Sequelize.DataTypes;

    db.bank = {};

    //  bank_bank  -------------------------------------------------------------

    db.bank.bank = db.sequelize.define("bank_bank", {
        active_from: { type: DataTypes.DATE },
        active_to: { type: DataTypes.DATE },
        name: { type: DataTypes.STRING },
        number: { type: DataTypes.STRING },
        transit: { type: DataTypes.STRING },
        tag: { type: DataTypes.STRING },
    }, { underscored: true });

    db.user.family.hasMany(db.bank.bank, { as: 'bank', foreignKey: 'user_family_id' });
    db.bank.bank.belongsTo(db.user.family, { as: 'family', foreignKey: 'user_family_id' });

    //  bank_account  ----------------------------------------------------------

    db.bank.account = db.sequelize.define("bank_account", {
        active_from: { type: DataTypes.DATE },
        active_to: { type: DataTypes.DATE },
        name: { type: DataTypes.STRING },
        number: { type: DataTypes.STRING },
        tag: { type: DataTypes.STRING },
    }, { underscored: true });

    db.user.family.hasMany(db.bank.account, { as: 'bankAccount', foreignKey: 'user_family_id' });
    db.bank.account.belongsTo(db.user.family, { as: 'family', foreignKey: 'user_family_id' });

    db.bank.bank.hasMany(db.bank.account, { as: 'account', foreignKey: 'bank_bank_id' });
    db.bank.account.belongsTo(db.bank.bank, { as: 'bank', foreignKey: 'bank_bank_id' });

    //  bank_transaction  ------------------------------------------------------

    db.bank.transaction = db.sequelize.define("bank_transaction", {
        time_stamp: { type: DataTypes.DATE },
        description: { type: DataTypes.STRING },
        amount: { type: DataTypes.DECIMAL(10, 2) },
        balance: { type: DataTypes.DECIMAL(10, 2) },
        sequence: { type: DataTypes.STRING },
        double_entry_id: { type: DataTypes.INTEGER },
        tag: { type: DataTypes.STRING },
    }, { underscored: true });

    db.user.family.hasMany(db.bank.transaction, { as: 'bankTransaction', foreignKey: 'user_family_id' });
    db.bank.transaction.belongsTo(db.user.family, { as: 'family', foreignKey: 'user_family_id' });

    db.bank.account.hasMany(db.bank.transaction, { as: 'transaction', foreignKey: 'bank_account_id' });
    db.bank.transaction.belongsTo(db.bank.account, { as: 'account', foreignKey: 'bank_account_id' });
}

