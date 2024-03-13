
module.exports = (logger, db) => {

    const encode = (user) => {
        const data = {
            //id: user.id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            authorization: {
                source: user.authorization.source,
                source_id: user.authorization.sourceId,
                password_hash: user.authorization.passwordHash
            }
        };
        return data;
    }

    const decode = (data) => {
        const user = {
            id: data.id,
            name: data.name,
            email: data.email,
            picture: data.picture,
            authorization: {
                source: data.authorization.source,
                sourceId: data.authorization.source_id,
                passwordHash: data.authorization.password_hash
            }
        };
        return user;
    }

    const decodeList = (data) => {

        const users = data.map(item => {
            return { id: item.id, name: item.name }
        });

        return { list: users };
    }

    const validateUser = (user) => {
        if (!user.authorization.source) {
            return "User source can not be empty!";
        }
        if (!user.authorization.source) {
            return "User authorization source can not be empty!";
        }
        if (!user.authorization.sourceId) {
            return "User authorization sourceId can not be empty!";
        }
        if (user.authorization.source === 'email' && !user.authorization.passwordHash) {
            return "User authorization password hash can not be empty!";
        }
        if (!user.name) {
            return "User name can not be empty!";
        }
        if (user.source === 'email' && !user.email) {
            return "User email can not be empty!";
        }
        if (user.source === 'email' && !user.password) {
            return "User password can not be empty!";
        }
        //if (!user.picture) {
        //    return "User picture can not be empty!";
        //}
        return null
    }

    const owner = "UserData";
    const common = require('./CommonData')(logger, owner, db.user, encode, decode, decodeList, validateUser);

    // Create and save a new record
    const create = async (user) => {
        logger.debug(owner, `${owner}.create: user =`, user);

        // Validate incoming business object.
        let error = await validateUser(user);
        if (error) {
            logger.error(owner, `${owner}.create: error =`, error);
            return { error };
        }

        // transform business object to data object.
        const encodedUser = encode(user);
        logger.debug(owner, `${owner}.update: encodedUser =`, encodedUser);
        if (encodedUser.error) {
            return encodedUser;
        }

        // Create record for business object in the database
        try {
            let data = await db.user.create(encodedUser, {
                include: [{
                    association: db.user.Authorization
                }]
            });

            logger.verbose(owner, `${owner}.create: data.dataValues =`, data.dataValues);

            // transform returned data object to return business object.
            const decodedUser = decode(data.dataValues);
            logger.debug(owner, `${owner}.create: decodedUser =`, decodedUser);
            if (decodedUser.error) {
                return decodedUser;
            }

            return decodedUser;
        }
        catch (ex) {
            error = ex.message || "Unknown error occurred while creating a record.";
            logger.error(owner, `${owner}.create: error =`, error);
            return { error };
        }
    };

    // Find a single record with an id
    const getOne = async (id) => {
        try {
            const user = await db.user.findByPk(id, {
                include: [{
                    association: db.user.Authorization,
                }]
            });
            logger.debug(owner, `UserData.getOne: user =`, user);

            if (user) {
                return decode(user);
            }

            return { error: `Cannot find data object with id=${id}.` };
        }
        catch (ex) {
            const error = ex.message || "Unknown error occurred while finding one record.";
            logger.error(owner, `${owner}.getOne: error =`, error);
            return { error };
        }
    };

    const getOneByAuthorization = async ({ source, sourceId }) => {
        logger.debug(owner, `UserData.getOneByAuthorization: source="${source}", sourceId="${sourceId}"`);
        try {
            const user = await db.user.findOne({
                include: [{
                    association: db.user.Authorization,
                    where: {
                        source: source,
                        source_id: sourceId
                    },
                }]
            });
            logger.debug(owner, `UserData.getOneByAuthorization: user =`, user.toJSON());

            if (!user)
                return { error: `Cannot find user object with source="${source}" and sourceId="${sourceId}".` };

            const decodedUser = decode(user.dataValues);
            logger.debug(owner, `UserData.getOneByAuthorization: decodedUser =`, decodedUser);

            return decodedUser;
        }
        catch (ex) {
            const error = ex.message || `Unknown error occurred while finding one database record matching source="${source}" and sourceId="${sourceId}".`;
            logger.error(owner, `${owner}.getOneByAuthorization: error = `, error);
            return { error };
        }
    }

    // Update a record by the id in the request
    const update = async (user) => {
        logger.debug(owner, `${owner}.update: user =`, user);

        // Validate incoming business object.
        let error = await validateUser(user);
        if (error) {
            logger.error(owner, `${owner}.update: error =`, error);
            return { error };
        }

        // transform business object to data object.
        const encodedUser = encode(user);
        logger.debug(owner, `${owner}.update: dataObject =`, encodedUser);
        if (encodedUser.error) {
            return encodedUser;
        }

        try {
            await db.user.update(encodedUser, {
                where: { id: user.id }
            });

            await db.authorization.update(encodedUser.authorization, {
                where: { user_user_id: user.id }
            });

            return await getOne(user.id);
        }
        catch (ex) {
            error = ex.message || "Unknown error occurred while updating a record.";
            logger.error(owner, `${owner}.update: error =`, error);
            return { error };
        }
    };

    return {
        ...common,
        create,
        getOne,
        getOneByAuthorization,
        update,
    }
}