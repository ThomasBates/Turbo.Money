'use strict';
const { Model } = require('sequelize');

/*
UserRole.propertyNames:
[
  'constructor',       '_customGetters',
  '_customSetters',    'validators',
  '_hasCustomGetters', '_hasCustomSetters',
  'id',                'name',
  'isHead',            'createdAt',
  'updatedAt',         'rawAttributes',
  '_isAttribute',      'getUserFamilyRole',
  'setUserFamilyRole', 'createUserFamilyRole',
  'getUserGrants',     'countUserGrants',
  'hasUserGrant',      'hasUserGrants',
  'setUserGrants',     'addUserGrant',
  'addUserGrants',     'removeUserGrant',
  'removeUserGrants',  'createUserGrant',
  'UserFamilyId',      'getUserFamily',
  'setUserFamily',     'createUserFamily'
]
*/

module.exports = (db) => {
    const sequelize = db.sequelize;
    const DataTypes = db.Sequelize.DataTypes;

    class UserRole extends Model {

        // define associations
        static associate(db) {
            db.UserRole.join.UserFamily = db.UserRole.belongsTo(db.UserFamily, {});
            db.UserFamily.join.UserRole = db.UserFamily.hasMany(db.UserRole, {});
        }
    }

    UserRole.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isHead: {
            type: DataTypes.BOOLEAN,
            default: false
        },
    }, {
        sequelize,
        modelName: 'UserRole',
        underscored: true,
    });

    UserRole.join = {};

    db.user.role = UserRole;

    return UserRole;
};