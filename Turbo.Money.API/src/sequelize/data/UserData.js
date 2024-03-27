
module.exports = function UserData(logger, db) {
    const module = 'UserData';
    const category = "User";

    const createError = (context, code, message) => {
        const error = { error: message, context, code, message };
        logger.error('Error', `${context}: error =`, error);
        return error;
    }

    const encode = (user) => {
        const data = {
            //id: user.id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            subscription: user.subscription,
            UserAuthorization: {
                source: user.authorization.source,
                sourceId: user.authorization.sourceId,
                passwordHash: user.authorization.passwordHash
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
            subscription: data.subscription,
            authorization: {
                source: data.UserAuthorization.source,
                sourceId: data.UserAuthorization.sourceId,
                passwordHash: data.UserAuthorization.passwordHash
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
        return null
    }

    // Create and save a new record
    const createUser = async (user) => {
        const context = `${module}.createUser`;
        logger.debug(category, `${context}: user =`, user);

        // Validate incoming business object.
        let error = await validateUser(user);
        if (error)
            return createError(context, 'Invalid', error);

        // transform business object to data object.
        const encodedUser = encode(user);
        logger.debug(category, `${context}: encodedUser =`, encodedUser);
        if (encodedUser.error) {
            return encodedUser;
        }

        logger.debug(category, `${context}: db.user =`, db.user);
        logger.debug(category, `${context}: db.user.join =`, db.user.join);
        logger.debug(category, `${context}: db.user.join.UserAuthorization =`, db.user.join.UserAuthorization);

        // Create record for business object in the database
        try {
            const data = await db.user.create(encodedUser, {
                include: [{
                    association: db.user.join.UserAuthorization
                }]
            });

            logger.verbose(category, `${context}: data =`, data.toJSON());

            // transform returned data object to return business object.
            const decodedUser = decode(data);
            logger.debug(category, `${context}: decodedUser =`, decodedUser);
            if (decodedUser.error) {
                return decodedUser;
            }

            return decodedUser;
        }
        catch (ex) {
            logger.error(category, `${context}: ex =`, ex);
            return createError(context, 'Catch', ex.message || 'Unknown catch');
        }
    };

    // Find a single record with an id
    const getUser = async (id) => {
        const context = `${module}.getUser`;
        logger.debug(category, `${context}: id =`, id);
        try {
            const data = await db.user.findByPk(id, {
                include: [{
                    association: db.user.join.UserAuthorization,
                }]
            });
            logger.debug(category, `${context}: data =`, data.toJSON());

            if (data) {
                return decode(data);
            }

            return { error: `Cannot find data object with id=${id}.` };
        }
        catch (ex) {
            logger.error(category, `${context}: ex =`, ex);
            return createError(context, 'Catch', ex.message || 'Unknown catch');
        }
    };

    const getUserByAuthorization = async ({ source, sourceId }) => {
        const context = `${module}.getUserByAuthorization`;
        logger.debug(category, `${context}: source="${source}", sourceId="${sourceId}"`);
        try {
            const userRecord = await db.user.findOne({
                include: [{
                    association: db.user.join.UserAuthorization,
                    where: {
                        source: source,
                        sourceId: sourceId
                    },
                }]
            });
            logger.verbose(category, `${context}: data =`, userRecord);

            if (!userRecord)
                return createError(context, 'InvalidData', `Cannot find user object with source="${source}" and sourceId="${sourceId}".`);

            const decodedUser = decode(userRecord);
            logger.debug(category, `${context}: decodedUser =`, decodedUser);

            logger.debug(category, `${context}: return `, decodedUser);
            return decodedUser;
        }
        catch (ex) {
            logger.error(category, `${context}: ex =`, ex);
            return createError(context, 'Catch', ex.message || 'Unknown catch');
        }
    }

    const getUserFamily = async (user, familyId) => {
        const context = `${module}.getUserFamily`;
        logger.debug(category, `${context}: user =`, user);
        logger.debug(category, `${context}: familyId =`, familyId);

        if (!user)
            return createError(context, 'InvalidArgument', "Missing or invalid argument: 'user'");

        if (!user.id)
            return createError(context, 'InvalidArgument', "Missing or invalid argument: 'user.id'");

        try {
            const userRecord = await db.user.findByPk(user.id);
            logger.verbose(category, `${context}: userRecord =`, userRecord);
            if (!userRecord)
                return createError(context, 'InvalidData', `Cannot find user object with id = ${user.id}".`);

            // get family records
            const familyRecords = await userRecord.getUserFamilies({
                where: { id: familyId }
            });
            logger.verbose(category, `${context}: familyRecords =`, familyRecords);
            if (!familyRecords || familyRecords.length < 1)
                return createError(context, 'InvalidData', `Cannot find family records where user id = ${userRecord.id} and family id = ${familyId}.`);

            const result = {
                id: familyRecords[0].id,
                name: familyRecords[0].name,
            };
            logger.debug(category, `${context}: return`, result);
            return result;
        }
        catch (ex) {
            logger.error(category, `${context}: ex =`, ex);
            return createError(context, 'Catch', ex.message || 'Unknown catch');
        }
    }

    // Update a record by the id in the request
    const updateUser = async (user) => {
        const context = `${module}.updateUser`;
        logger.debug(category, `${context}: user =`, user);

        // Validate incoming business object.
        let error = await validateUser(user);
        if (error) {
            logger.error(category, `${context}: error =`, error);
            return { error };
        }

        // transform business object to data object.
        const encodedUser = encode(user);
        logger.debug(category, `${context}: dataObject =`, encodedUser);
        if (encodedUser.error) {
            return encodedUser;
        }

        try {
            await db.user.update(encodedUser, {
                where: { id: user.id }
            });

            await db.authorization.update(encodedUser.authorization, {
                where: { userUserUd: user.id }
            });

            return await getUser(user.id);
        }
        catch (ex) {
            logger.error(category, `${context}: ex =`, ex);
            return createError(context, 'Catch', ex.message || 'Unknown catch');
        }
    };

    // Create and save a new record
    const initializeNewUser = async (user, family, role) => {
        const context = `${module}.initializeNewUser`;
        logger.debug(category, `${context}: user =`, user);
        logger.debug(category, `${context}: family =`, family);
        logger.debug(category, `${context}: role =`, role);

        if (!user || !user.id)
            return createError(context, 'InvalidArgument', "Missing or invalid argument: 'user'");

        if (!family || !family.name)
            return createError(context, 'InvalidArgument', "Missing or invalid argument: 'family'");

        if (!role || !role.name)
            return createError(context, 'InvalidArgument', "Missing or invalid argument: 'role'");

        // Create record for business object in the database
        try {
            const userRecord = await db.user.findByPk(user.id);
            if (!userRecord)
                return createError(context, 'NotFound', `Could not find user where id = ${user.id}`);
            logger.debug(category, `${context}: userRecord =`, userRecord.toJSON());

            const userFamilyRecord = await db.family.create({ name: family.name, isInitial: true });
            if (!userFamilyRecord)
                return createError(context, 'CannotCreate', `Could not create userFamily`);
            logger.debug(category, `${context}: userFamilyRecord =`, userFamilyRecord.toJSON());

            const userRoleRecord = await db.role.create({
                name: role.name,
                isHead: role.isHead
            })
            if (!userRoleRecord)
                return createError(context, 'CannotCreate', `Could not create userRole`);
            logger.debug(category, `${context}: userRoleRecord =`, userRoleRecord.toJSON());

            await userFamilyRecord.addUserRole(userRoleRecord);

            const userFamilyRoleRecord = await db.familyRole.create();
            if (!userFamilyRoleRecord)
                return createError(context, 'CannotCreate', `Could not create userFamilyRole`);

            await userFamilyRoleRecord.setUserFamily(userFamilyRecord);
            await userFamilyRoleRecord.setUserUser(userRecord);
            await userFamilyRoleRecord.setUserRole(userRoleRecord);

            logger.debug(category, `${context}: userFamilyRoleRecord =`, userFamilyRoleRecord.toJSON());

            if (role.grants) {
                await Promise.all(
                    role.grants.map(async grantName => {
                        await userRoleRecord.addUserGrant({ name: grantName });
                    })
                );
            }

            const result = {};

            logger.debug(category, `${context}: return`, result);

            return result;
        }
        catch (ex) {
            logger.error(category, `${context}: ex =`, ex);
            return createError(context, 'Catch', ex.message || 'Unknown catch');
        }
    };

    const getUserFamilyRoleGrants = async (userId, familyId) => {
        const context = `${module}.getUserFamilyRoleGrants`;
        logger.debug(category, `${context}: userId =`, userId);
        logger.debug(category, `${context}: familyId =`, familyId);

        if (!userId)
            return createError(context, 'InvalidArgument', "Missing or invalid argument: 'userId'");

        try {
            // get user record
            const userRecord = await db.user.findByPk(userId);
            logger.verbose(category, `${context}: userRecord =`, userRecord);

            // get family records
            const familyRecords = await userRecord.getUserFamilies();
            logger.verbose(category, `${context}: familyRecords =`, familyRecords);

            if (familyRecords.length == 0) 
                return createError(context, 'InvalidData', "No UserFamily records found.");

            const familyNames = familyRecords.map(record => record.name);
            logger.verbose(category, `${context}: familyNames =`, familyNames);

            // get selected family record
            let selectedFamilyRecord = null;
            if (familyRecords.length == 1) {
                selectedFamilyRecord = familyRecords[0];
            }
            else {
                if (familyId)
                    selectedFamilyRecord = familyRecords.find(record => record.id === familyId);

                if (!selectedFamilyRecord)
                    selectedFamilyRecord = familyRecords.find(record => record.isInitial);

                if (!selectedFamilyRecord)
                    selectedFamilyRecord = familyRecords[0];
            }

            // get role and grants for selected family record.
            const familyRoleRecord = await userRecord.getUserFamilyRoles({
                where: { UserFamilyId: selectedFamilyRecord.id }
            });
            logger.verbose(category, `${context}: familyRoleRecord =`, familyRoleRecord);

            const roleRecord = await familyRoleRecord[0].getUserRole();
            logger.verbose(category, `${context}: roleRecord =`, roleRecord);

            const grantRecords = await roleRecord.getUserGrants();
            logger.verbose(category, `${context}: grantRecords =`, grantRecords);

            const grantList = grantRecords.map(record => record.name);
            logger.verbose(category, `${context}: grantList =`, grantList);

            user = {
                name: userRecord.name,
                picture: userRecord.picture,
                subscription: userRecord.subscription,
                familyNames,
                selectedFamily: {
                    name: selectedFamilyRecord.name,
                    isInitial: selectedFamilyRecord.isInitial,
                    role: {
                        name: roleRecord.name,
                        isHead: roleRecord.isHead,
                        grants: grantList,
                    }
                }
            }
            logger.verbose(category, `${context}: return`, user);
            return user;

        } catch (ex) {
            logger.error(category, `${context}: ex =`, ex);
            return createError(context, 'Catch', ex.message || 'Unknown catch');
        }
    };

    const getUserDefaultFamilyId = async (user) => {
        const context = `${module}.getUserFamilyId`;
        logger.debug(category, `${context}: user =`, user);

        if (!user)
            return createError(context, 'InvalidArgument', "Missing or invalid argument: 'user'");

        try {
            // get user record
            const userRecord = await db.user.findByPk(user.id);
            logger.verbose(category, `${context}: userRecord =`, userRecord);
            if (!userRecord)
                return createError(context, 'InvalidData', `Cannot find user record where user id = ${user.id}.`);

            // get family records
            const familyRecords = await userRecord.getUserFamilies();
            logger.verbose(category, `${context}: familyRecords =`, familyRecords);
            if (!familyRecords || familyRecords.length < 1)
                return createError(context, 'InvalidData', `Cannot find family records for user id = ${userRecord.id}.`);

            const defaultFamily = familyRecords.find(record => record.isInitial);
            if (!defaultFamily)
                defaultFamily = familyRecords[0];

            const result = {
                userId: user.id,
                familyId: defaultFamily.id,
            };
            logger.verbose(category, `${context}: return`, result);

            return result;
        } catch (ex) {
            logger.error(category, `${context}: ex =`, ex);
            return createError(context, 'Catch', ex.message || 'Unknown catch');
        }
    }

    return {
        createUser,
        getUser,
        getUserByAuthorization,
        getUserFamily,
        updateUser,
        initializeNewUser,
        getUserFamilyRoleGrants,
        getUserDefaultFamilyId,
    }
}