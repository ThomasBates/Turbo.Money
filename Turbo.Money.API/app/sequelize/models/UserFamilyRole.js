'use strict';
const { Model } = require('sequelize');

/*
 [
  'constructor',       '_customGetters',
  '_customSetters',    'validators',
  '_hasCustomGetters', '_hasCustomSetters',
  'id',                'createdAt',
  'updatedAt',         'rawAttributes',
  '_isAttribute',      'UserUserId',
  'UserFamilyId',      'getUserUser',
  'setUserUser',       'createUserUser',
  'getUserFamily',     'setUserFamily',
  'createUserFamily',  'UserRoleId',
  'getUserRole',       'setUserRole',
  'createUserRole'
]
*/

module.exports = (db) => {
    const sequelize = db.sequelize;
    const DataTypes = db.Sequelize.DataTypes;

    class UserFamilyRole extends Model {

        // define associations
        static associate(db) {

            db.UserUser.join.UserFamily = db.UserUser.belongsToMany(db.UserFamily, { through: db.UserFamilyRole, });
            db.UserFamily.join.UserUser = db.UserFamily.belongsToMany(db.UserUser, { through: db.UserFamilyRole, });

            db.UserFamilyRole.join.UserUser = db.UserFamilyRole.belongsTo(db.UserUser, {});
            db.UserUser.join.UserFamilyRole = db.UserUser.hasMany(db.UserFamilyRole, {});

            db.UserFamilyRole.join.UserFamily = db.UserFamilyRole.belongsTo(db.UserFamily, {});
            db.UserFamily.join.UserFamilyRole = db.UserFamily.hasMany(db.UserFamilyRole, {});

            db.UserFamilyRole.join.UserRole = db.UserFamilyRole.belongsTo(db.UserRole, {});
            db.UserRole.join.UserFamilyRole = db.UserRole.hasOne(db.UserFamilyRole, {});
        }

        static dumpPropertyNames(record) {
            const prototype = Object.getPrototypeOf(record);
            const propertyNames = Object.getOwnPropertyNames(prototype);
            console.log('/*')
            console.log(`UserFamilyRole.propertyNames:`);
            console.log(propertyNames);
            console.log('*/')
            console.log('')
        }
    }

    UserFamilyRole.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'UserFamilyRole',
        underscored: true,
    });

    UserFamilyRole.join = {};

    db.user.familyRole = UserFamilyRole;

    return UserFamilyRole;
};