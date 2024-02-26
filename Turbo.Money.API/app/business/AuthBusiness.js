
module.exports = (logger, data) => {

    const signUp = async (user) => {
        logger.debug('Auth',"AuthBusiness.signUp: user =", user);

        let [error, existingUser] = await data.getOneBySourceId(user.source, user.sourceId);
        if (error) {
            if (!error.startsWith("Cannot find user object")) {
                logger.debug('Auth', "AuthBusiness.signUp: data.getOneBySourceId().error =", error);
                return error;
            }
            logger.error('Auth', "AuthBusiness.signUp: data.getOneBySourceId().error =", error);
        }
        if (existingUser) {
            logger.debug('Auth',"AuthBusiness.signUp: data.getOneBySourceId().existingUser =", existingUser);
            return "User already exists.";
        }

        let newUser = {
            source: user.source,
            sourceId: user.sourceId,
            name: user.name,
            email: user.email,
            picture: user.picture
        };
        logger.debug('Auth',"AuthBusiness.signUp: newUser =", newUser);

        let createdUser;
        [error, createdUser] = await data.create(newUser);
        if (error) {
            logger.error('Auth',"AuthBusiness.signUp: data.create(newUser).error =", error);
            return error;
        }

        //error = await data.initializeDataForNewUser(createdUser);
        //if (error) {
        //    logger.error('Auth',"AuthBusiness.signUp: data.initializeDataForNewUser(createdUser).error =", error);
        //    return error;
        //}

        return "";
    }

    const signIn = async (user) => {
        return await update(user);
    }

    const update = async (user) => {
        logger.debug('Auth',"AuthBusiness.update: user =", user);

        let [error, existingUser] = await data.getOneBySourceId(user.source, user.sourceId);
        if (error) {
            return error;
        }
        if (!existingUser) {
            return "User does not exist.";
        }

        existingUser = {
            ...existingUser,
            name: user.name,
            email: user.email,
            picture: user.picture
        };

        [error, _] = await data.update(existingUser);
        if (error) {
            return error;
        }

        return "";
    }

    return {
        signUp,
        signIn,
        update,
    };
}
