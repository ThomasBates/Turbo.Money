'use strict';
const { Model } = require('sequelize');

/*
UserAuthorization.propertyNames:
[
  'constructor',       '_customGetters',
  '_customSetters',    'validators',
  '_hasCustomGetters', '_hasCustomSetters',
  'id',                'source',
  'sourceId',          'passwordHash',
  'createdAt',         'updatedAt',
  'rawAttributes',     '_isAttribute',
  'UserUserId',        'getUserUser',
  'setUserUser',       'createUserUser'
]
*/

module.exports = (db) => {
    const sequelize = db.sequelize;
    const DataTypes = db.Sequelize.DataTypes;

    class UserAuthorization extends Model {

        // define associations
        static associate(db) {
            db.UserAuthorization.join.UserUser = db.UserAuthorization.belongsTo(db.UserUser, {});
            db.UserUser.join.UserAuthorization = db.UserUser.hasOne(db.UserAuthorization, {});
        }
    }

    UserAuthorization.init({
        source: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sourceId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        passwordHash: {
            type: DataTypes.STRING
        },
    }, {
        sequelize,
        modelName: 'UserAuthorization',
        underscored: true,
    });

    UserAuthorization.join = {};

    db.user.authorization = UserAuthorization;

    return UserAuthorization;
};