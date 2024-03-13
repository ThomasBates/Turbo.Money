
module.exports = (logger, data) => {

    // Validate user data
    const validate = async (testUser) => {
        logger.debug("Business", "UserBusiness.validate: testUser = ", testUser);

        let users = await data.getList();
        if (users.error) {
            return users.error;
        }
        if (!users || !users.list || users.list.length == 0) {
            return null;
        }
        logger.debug("Business", "UserBusiness.validate: users = ", users.list);

        let matching = users.list.find(user =>
            user.sourceId.toLowerCase() == testUser.sourceId.toLowerCase() &&
            user.id != testUser.id);
        logger.debug("Business", "UserBusiness.validate: matching = ", matching);
        if (matching) {
            return "Validation Error: User email must be unique.";
        }

        return null;
    }

    const common = require('./CommonBusiness')(logger, data);

    const signUp = async (user) => {
        logger.debug('User', "UserBusiness.signUp: user =", user);

        const existingUser = await data.getOneByAuthorization(user.authorization);
        logger.debug('User', "UserBusiness.signUp: existingUser =", existingUser);
        if (existingUser.error) {
            if (!existingUser.error.startsWith("Cannot find user object")) {
                return error;
            }
        }
        else {
            return "User already exists.";
        }

        let newUser = {
            name: user.name,
            email: user.email,
            picture: user.picture,
            authorization: {
                source: user.authorization.source,
                sourceId: user.authorization.sourceId,
                passwordHash: user.authorization.passwordHash,
            }
        };
        logger.debug('User', "UserBusiness.signUp: newUser =", newUser);

        const createdUser = await data.create(newUser);
        logger.debug('User', "UserBusiness.signUp: createdUser =", createdUser);
        if (createdUser.error) {
            return createdUser.error;
        }

        error = await initializeDataForNewUser(createdUser);
        if (error) {
            logger.error('User',"UserBusiness.signUp: initializeDataForNewUser(createdUser).error =", error);
            return error;
        }

        return "";
    }

    const signIn = async (user) => {
        logger.debug('User', "UserBusiness.signIn: user =", user);

        const existingUser = await data.getOneByAuthorization(user.authorization);
        if (existingUser.error) {
            return existingUser.error;
        }
        if (!existingUser) {
            return "User does not exist.";
        }

        if (existingUser.authorization.passwordHash != user.authorization.passwordHash) {
            return "Invalid credentials";
        }

        return "";
    }

    const update = async (user) => {
        logger.debug('User', "UserBusiness.update: user =", user);

        const existingUser = await data.getOneByAuthorization(user.authorization);
        if (existingUser.error) {
            return existingUser.error;
        }
        if (!existingUser) {
            return "User does not exist.";
        }

        const updateUser = {
            id: existingUser.id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            authorization: existingUser.authorization,
        };

        const updatedUser = await data.update(updateUser);
        if (updatedUser.error) {
            return updatedUser.error;
        }

        return "";
    }

    const initializeDataForNewUser = async (user) => {
        return "";
    }

    return {
        ...common,
        validate,
        signUp,
        signIn,
        update,
    };
}
