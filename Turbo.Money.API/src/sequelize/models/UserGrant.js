'use strict';
const { Model } = require('sequelize');

/*
UserGrant.propertyNames:
[
  'constructor',       '_customGetters',
  '_customSetters',    'validators',
  '_hasCustomGetters', '_hasCustomSetters',
  'id',                'name',
  'createdAt',         'updatedAt',
  'rawAttributes',     '_isAttribute',
  'UserRoleId',        'getUserRole',
  'setUserRole',       'createUserRole'
]
*/

module.exports = (db) => {
    const sequelize = db.sequelize;
    const DataTypes = db.Sequelize.DataTypes;

    class UserGrant extends Model {

        // define associations
        static associate(db) {
            db.UserGrant.join.UserRole = db.UserGrant.belongsTo(db.UserRole, {});
            db.UserRole.join.UserGrant = db.UserRole.hasMany(db.UserGrant, {});
        }
    }

    UserGrant.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'UserGrant',
        underscored: true,
    });

    UserGrant.join = {};

    db.user.grant = UserGrant;

    return UserGrant;
};