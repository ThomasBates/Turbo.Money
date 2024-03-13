module.exports = (db) => {
    const DataTypes = db.Sequelize.DataTypes;

    db.user = {};

    //  user_grant  ---------------------------------------------------------

    grant = db.sequelize.define("user_grant", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    }, { underscored: true, timestamps: false });

    //  user_role  -----------------------------------------------------------

    role = db.sequelize.define("user_role", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    }, { underscored: true, timestamps: false });

    role.Grant = role.belongsToMany(grant, {
        as: 'grant',
        through: 'user_role_grants',
        underscored: true,
        timestamps: false
    });
    grant.Role = grant.belongsToMany(role, {
        as: 'role',
        through: 'user_role_grants',
        underscored: true,
        timestamps: false
    });

    //  user_user  -----------------------------------------------------------

    user = db.sequelize.define("user_user", {
        active_from: { type: DataTypes.DATE },
        active_to: { type: DataTypes.DATE },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: { type: DataTypes.STRING },
        picture: { type: DataTypes.STRING },
        tag: { type: DataTypes.STRING },
    }, { underscored: true });

    user.Role = user.belongsToMany(role, { as: 'role', through: 'user_user_roles' });
    role.User = role.belongsToMany(user, { as: 'user', through: 'user_user_roles' });

    //  user_user_authorization  ---------------------------------------------

    authorization = db.sequelize.define("user_authorization", {
        source: { type: DataTypes.STRING },
        source_id: { type: DataTypes.STRING },
        password_hash: { type: DataTypes.STRING },
    }, { underscored: true });

    user.Authorization = user.hasOne(authorization, { as: 'authorization', foreignKey: 'user_user_id' });
    authorization.User = authorization.belongsTo(user, { as: 'user', foreignKey: 'user_user_id' });

    //  user_family  ---------------------------------------------------------

    family = db.sequelize.define("user_family", {
        active_from: DataTypes.DATE,
        active_to: DataTypes.DATE,
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        tag: DataTypes.STRING,
    }, { underscored: true });

    family.Grant = family.belongsToMany(grant, { as: 'grant', through: 'user_family_grants' });
    grant.Family = grant.belongsToMany(family, { as: 'family', through: 'user_family_grants' });

    user.Family = user.belongsToMany(family, { as: 'family', through: 'user_user_families' });
    family.User = family.belongsToMany(user, { as: 'user', through: 'user_user_families' });

    db.user = {
        grant,
        role,
        user,
        authorization,
        family,
    };
}

