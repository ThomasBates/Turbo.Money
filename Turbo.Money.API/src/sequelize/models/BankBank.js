'use strict';
const { Model } = require('sequelize');

/*
BankBank.propertyNames:
[
  'constructor',       '_customGetters',
  '_customSetters',    'validators',
  '_hasCustomGetters', '_hasCustomSetters',
  'id',                'activeStart',
  'activeEnd',         'name',
  'description',       'number',
  'branch',            'createdAt',
  'updatedAt',         'rawAttributes',
  '_isAttribute',      'getBankAccounts',
  'countBankAccounts', 'hasBankAccount',
  'hasBankAccounts',   'setBankAccounts',
  'addBankAccount',    'addBankAccounts',
  'removeBankAccount', 'removeBankAccounts',
  'createBankAccount', 'UserFamilyId',
  'getUserFamily',     'setUserFamily',
  'createUserFamily'
]
*/

module.exports = (db) => {
    const sequelize = db.sequelize;
    const DataTypes = db.Sequelize.DataTypes;

    class BankBank extends Model {

        // define associations
        static associate(db) {
            db.BankBank.join.UserFamily = db.BankBank.belongsTo(db.UserFamily, {});
            db.UserFamily.join.BankBank = db.UserFamily.hasMany(db.BankBank, {});
        }
    }

    BankBank.init({
        activeStart: {
            type: DataTypes.DATE
        },
        activeEnd: {
            type: DataTypes.DATE
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        number: {
            type: DataTypes.STRING
        },
        branch: {
            type: DataTypes.STRING
        },
    }, {
        sequelize,
        modelName: 'BankBank',
        underscored: true,
    });

    BankBank.join = {};

    db.bank.bank = BankBank;

    return BankBank;
};