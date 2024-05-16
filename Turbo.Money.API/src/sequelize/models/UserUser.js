'use strict';
const { Model } = require('sequelize');

/*
UserUser.propertyNames:
[
  'constructor',
  '_customGetters',
  '_customSetters',
  'validators',
  '_hasCustomGetters',
  '_hasCustomSetters',
  'id',
  'activeStart',
  'activeEnd',
  'name',
  'email',
  'picture',
  'subscription',
  'createdAt',
  'updatedAt',
  'rawAttributes',
  '_isAttribute',
  'getUserAuthorization',
  'setUserAuthorization',
  'createUserAuthorization',
  'getUserFamilies',
  'countUserFamilies',
  'hasUserFamily',
  'hasUserFamilies',
  'setUserFamilies',
  'addUserFamily',
  'addUserFamilies',
  'removeUserFamily',
  'removeUserFamilies',
  'createUserFamily',
  'getUserFamilyRoles',
  'countUserFamilyRoles',
  'hasUserFamilyRole',
  'hasUserFamilyRoles',
  'setUserFamilyRoles',
  'addUserFamilyRole',
  'addUserFamilyRoles',
  'removeUserFamilyRole',
  'removeUserFamilyRoles',
  'createUserFamilyRole'
]
*/

module.exports = (db) => {
    const sequelize = db.sequelize;
    const DataTypes = db.Sequelize.DataTypes;

    class UserUser extends Model {

        // define associations
        static associate(db) {
        }
    }

    UserUser.init({
        activeStart: {
            type: DataTypes.DATE
        },
        activeEnd: {
            type: DataTypes.DATE
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        picture: {
            type: DataTypes.STRING
        },
        subscription: {
            type: DataTypes.STRING
        },
    }, {
        sequelize,
        modelName: 'UserUser',
        underscored: true,
    });

    UserUser.join = {};

    db.user.user = UserUser;

    return UserUser;
};