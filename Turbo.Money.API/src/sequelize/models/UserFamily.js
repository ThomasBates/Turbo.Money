'use strict';
const { Model } = require('sequelize');

/*
[
  'constructor',           '_customGetters',        '_customSetters',
  'validators',            '_hasCustomGetters',     '_hasCustomSetters',
  'id',                    'activeFrom',            'activeTo',
  'name',                  'tag',                   'createdAt',
  'updatedAt',             'rawAttributes',         '_isAttribute',
  'getBankAccount',        'countBankAccount',      'hasBankAccount',
  'setBankAccount',        'addBankAccount',        'removeBankAccount',
  'createBankAccount',     'getBank',               'countBank',
  'hasBank',               'setBank',               'addBank',
  'removeBank',            'createBank',            'getBankTransaction',
  'countBankTransaction',  'hasBankTransaction',    'setBankTransaction',
  'addBankTransaction',    'removeBankTransaction', 'createBankTransaction',
  'getBudgetAccount',      'countBudgetAccount',    'hasBudgetAccount',
  'setBudgetAccount',      'addBudgetAccount',      'removeBudgetAccount',
  'createBudgetAccount',   'getBudgetCategory',     'countBudgetCategory',
  'hasBudgetCategory',     'setBudgetCategory',     'addBudgetCategory',
  'removeBudgetCategory',  'createBudgetCategory',  'getBudgetSection',
  'countBudgetSection',    'hasBudgetSection',      'setBudgetSection',
  'addBudgetSection',      'removeBudgetSection',   'createBudgetSection',
  'getUserUsers',          'countUserUsers',        'hasUserUser',
  'hasUserUsers',          'setUserUsers',          'addUserUser',
  'addUserUsers',          'removeUserUser',        'removeUserUsers',
  'createUserUser',        'getUserFamilyRoles',    'countUserFamilyRoles',
  'hasUserFamilyRole',     'hasUserFamilyRoles',    'setUserFamilyRoles',
  'addUserFamilyRole',     'addUserFamilyRoles',    'removeUserFamilyRole',
  'removeUserFamilyRoles', 'createUserFamilyRole',  'getUserRoles',
  'countUserRoles',        'hasUserRole',           'hasUserRoles',
  'setUserRoles',          'addUserRole',           'addUserRoles',
  'removeUserRole',        'removeUserRoles',       'createUserRole'
]
*/

module.exports = (db) => {
    const sequelize = db.sequelize;
    const DataTypes = db.Sequelize.DataTypes;

    class UserFamily extends Model {

        // define associations
        static associate(db) {
        }
    }

    UserFamily.init({
        activeFrom: {
            type: DataTypes.DATE
        },
        activeTo: {
            type: DataTypes.DATE
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isInitial: {
            type: DataTypes.BOOLEAN
        },
        tag: {
            type: DataTypes.STRING
        },
    }, {
        sequelize,
        modelName: 'UserFamily',
        underscored: true,
    });

    UserFamily.join = {};

    db.user.family = UserFamily;

    return UserFamily;
};