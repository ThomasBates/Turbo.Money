
module.exports = function UserBusiness(logger, data) {
    const module = 'UserBusiness';
    const category = 'User';

    const crypto = require('crypto');

    let state = {
        inProgress: [],
    }

    const strategy = {
        facebook: require('./authStrategy/FacebookStrategy')(logger),
        google: require('./authStrategy/GoogleStrategy')(logger),
        twitter: require('./authStrategy/TwitterStrategy')(logger),
        email: require('./authStrategy/EmailStrategy')(logger),
    }

    const allGrants = {
        Personal: [
            'ViewBanking',
            'EditBanking',
            'ViewBankTransactions',
            'UploadBankTransactions',
            'ViewBudget',
            'SandboxBudget',
            'UpdateBudget',
            'ViewBudgetTransactions',
            'EditBudgetTransactions',
            'ViewBudgetReports',
        ],
        Family: [
            'ViewBanking',
            'EditBanking',
            'ViewBankTransactions',
            'UploadBankTransactions',
            'ViewBudget',
            'SandboxBudget',
            'UpdateBudget',
            'ViewBudgetTransactions',
            'EditBudgetTransactions',
            'ViewBudgetReports',
            'ManageFamilyUsers',
            'ManageFamilyRoles',
        ],
        Premium: [
            'ViewBanking',
            'EditBanking',
            'ViewBankTransactions',
            'UploadBankTransactions',
            'ImportBankTransactions',
            'ViewBudget',
            'SandboxBudget',
            'UpdateBudget',
            'ViewBudgetTransactions',
            'EditBudgetTransactions',
            'ViewBudgetReports',
            'ManageFamilyUsers',
            'ManageFamilyRoles',
        ],
        System: [
            'ManageAllUsers',
        ],
    };

    //  State Functions  ---------------------------------------------------------------------------

    function beginInProgress(user) {
        const key = `${user.source}:${user.sourceId}`;

        let index = state.inProgress.indexOf(key);
        if (index < 0) {
            state.inProgress.push(key);
        }
    }

    function endInProgress(user) {
        const key = `${user.source}:${user.sourceId}`;

        let index = state.inProgress.indexOf(key);
        while (index >= 0) {
            state.inProgress.splice(index, 1);
            index = state.inProgress.indexOf(key);
        }
    }

    function isInProgress(user) {
        const key = `${user.source}:${user.sourceId}`;

        return state.inProgress.indexOf(key) >= 0;
    }

    //  Exported Functions  ------------------------------------------------------------------------

    const getSignInUrl = (source, mode) => {
        const context = `${module}.getSignInUrl`;
        logger.debug(category, context, '***************************************************');
        logger.debug(category, context, `source = "${source}", mode = "${mode}"`);

        if (!(source in strategy))
            return { error: `Source "${source}" not supported` };

        if (!(mode in signInUserFunction))
            return { error: `Mode "${mode}" not supported` };

        const url = strategy[source].getSignInUrl();

        result = { url };

        logger.debug(category, context, 'return', result);
        return result;
    };

    const getSignedIn = async (userCookie, tokenCookie) => {
        const context = `${module}.getSignedIn`;
        logger.debug(category, context, '****************************************************');
        logger.debug(category, context, 'userCookie =', userCookie);
        logger.debug(category, context, 'tokenCookie =', tokenCookie);

        const handleMessage = (message) => {
            const result = { message };
            logger.debug(category, context, 'return', result);
            endInProgress(userCookie);
            return result;
        };

        const handleError = (error) => {
            const result = { error };
            logger.error(category, context, 'return', result);
            endInProgress(userCookie);
            return result;
        };

        //  Return if already in progress
        if (isInProgress(userCookie))
            return handleMessage("In Progress");
        beginInProgress(userCookie);

        //  validate user cookie
        const validation = await validateUserCookie(userCookie);
        if (validation.error)
            return handleError(`invalid user cookie: ${validation.error}`);

        //  Use refresh token to get new access token
        let tokens = await strategy[userCookie.source].refreshAccessToken(tokenCookie.refresh_token);
        logger.verbose(category, context, 'refreshAccessToken returned:', tokens);
        if (tokens.error)
            return handleError(`refreshAccessToken returned: ${tokens.error}`);

        //  Get user data with new access token
        let authUser = await strategy[userCookie.source].getUserData(tokens.accessToken);
        logger.verbose(category, context, 'authUser =', authUser);
        if (authUser.error)
            return handleError(`getUserData returned: ${authUser.error}`);

        // update user in DB
        const updateResult = await updateUserAuthAttributes(authUser);
        logger.verbose(category, context, 'updatedUser =', updateResult);
        if (updateResult.error) {
            return (updateResult.error.startsWith("Cannot find user object") ? handleMessage : handleError)
                (`updateUserAuthAttributes returned: ${updateResult.error}`);
        }

        //  get user family, role, & grants to return to UI
        const user = await getUserFamilyRoleGrants(userCookie.userId, userCookie.familyId);
        logger.verbose(category, context, 'user =', user);
        if (user.error)
            return handleError(`getUserFamilyRollGrants returned: ${user.error}`);

        //  Return { user } if able to get user data with access token.
        const result = { user, tokens };

        logger.debug(category, context, 'return', result);
        endInProgress(userCookie);
        return result;
    };

    const signIn = async (source, mode, params) => {
        const context = `${module}.signIn`;
        logger.debug(category, context, '*********************************************************');
        logger.debug(category, context, 'params =', params);

        let authUser = null;

        const handleError = (error) => {
            const result = { error };
            logger.error(category, context, 'return', result);
            if (authUser)
                endInProgress(authUser);
            return result;
        }

        try {
            //  Exchange params (code) for access (and refresh) token.
            let tokens = await strategy[source].getAccessToken(params);
            logger.verbose(category, context, 'getAccessTokens returned:', tokens);
            if (tokens.error)
                return handleError(`getAccessToken returned: ${tokens.error}`);

            //  Get user source id, name, email, and picture data.
            authUser = await strategy[source].getUserData(tokens.accessToken);
            logger.verbose(category, context, 'authUser =', authUser);
            if (authUser.error)
                return handleError(`getUserData returned: ${authUser.error}`);

            beginInProgress(authUser);

            if (params.password) {
                authUser.authorization.passwordHash = crypto
                    .createHash('sha256')
                    .update(authUser.sourceId + process.env.PASSWORD_HASH_SALT + params.password)
                    .digest('base64');
            }

            // store user in DB
            const signInResult = await signInUserFunction[mode](authUser);
            logger.verbose(category, context, 'signInResult =', signInResult);
            if (signInResult.error)
                return handleError(`signInUserFunction[${mode}] returned: ${signInResult.error}`);

            //  get user family, role, & grants to return to UI
            const user = await getUserFamilyRoleGrants(signInResult.userId);
            logger.verbose(category, context, 'user =', user);
            if (user.error)
                return handleError(`getUserFamilyRollGrants returned: ${user.error}`);

            //  Return { user } if able to get user data with access token.
            const result = {
                user,
                userCookie: {
                    source: source,
                    sourceId: authUser.authorization.sourceId,
                    userId: signInResult.userId,
                    familyId: signInResult.familyId,
                },
                tokenCookie: {
                    access_token: tokens.accessToken,
                    refresh_token: tokens.refreshToken
                }
            };

            logger.debug(category, context, 'return', result);
            endInProgress(authUser);
            return result;

        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return handleError(`catch: ${ex.message || 'Server error'}`);
        }
    };

    //  Local Functions  ---------------------------------------------------------------------------

    const validateUserCookie = async (userCookie) => {
        const context = `${module}.validateUserCookie`;
        logger.debug(category, context, 'userCookie =', userCookie);

        if (!userCookie.source)
            return { error: `${context}: Invalid user cookie: missing source` };

        if (!userCookie.sourceId)
            return { error: `${context}: Invalid user cookie: missing sourceId` };

        if (!userCookie.userId)
            return { error: `${context}: Invalid user cookie: missing userId` };

        if (!userCookie.familyId)
            return { error: `${context}: Invalid user cookie: missing familyId` };

        if (!userCookie.source || !(userCookie.source in strategy))
            return { error: `${context}: Invalid user cookie: source ("${userCookie.source}") in user cookie is not supported` };

        const user = await data.getUserByAuthorization(userCookie);
        logger.debug(category, context, 'user =', user);
        if (user.error)
            return { error: `${context}: Invalid user cookie: ${user.error}`};

        const family = await data.getUserFamily(user, userCookie.familyId);
        logger.debug(category, context, 'family =', family);
        if (family.error)
            return { error: `${context}: Invalid user cookie: ${family.error}` };

        return {}
    }

    const signUpUser = async (user) => {
        const context = `${module}.signUpUser`;
        logger.debug(category, context, 'user =', user);

        const existingUser = await data.getUserByAuthorization(user.authorization);
        logger.debug(category, context, 'existingUser =', existingUser);
        if (existingUser.error) {
            if (!existingUser.error.startsWith("Cannot find user object")) {
                return { error: existingUser.error };
            }
        }
        else {
            return { error: "User already exists." };
        }

        let newUser = {
            name: user.name,
            email: user.email,
            picture: user.picture,
            subscription: 'Family',
            authorization: {
                source: user.authorization.source,
                sourceId: user.authorization.sourceId,
                passwordHash: user.authorization.passwordHash,
            },
        };
        logger.debug(category, context, 'newUser =', newUser);

        const createdUser = await data.createUser(newUser);
        logger.debug(category, context, 'createdUser =', createdUser);
        if (createdUser.error) {
            return createdUser;
        }

        const initializeResult = await initializeNewUser(createdUser);
        logger.debug(category, context, 'initializeResult =', initializeResult);
        if (initializeResult.error) {
            return initializeResult;
        }

        const signUpResult = await data.getUserDefaultFamilyId(createdUser);
        logger.debug(category, context, 'signUpResult =', signUpResult);

        return signUpResult;
    }

    const signInUser = async (user) => {
        const context = `${module}.signInUser`;
        logger.debug(category, context, 'user =', user);

        const existingUser = await data.getUserByAuthorization(user.authorization);
        logger.debug(category, context, 'existingUser =', existingUser);
        if (existingUser.error) {
            return existingUser;
        }

        if (existingUser.authorization.passwordHash != user.authorization.passwordHash) {
            logger.warning(category, context, 'Invalid credentials');
            return { error: "Invalid credentials" };
        }

        const signInResult = await data.getUserDefaultFamilyId(existingUser);
        logger.debug(category, context, 'signInResult =', signInResult);

        return signInResult;
    }

    const updateUserAuthAttributes = async (user) => {
        const context = `${module}.updateUserAuthAttributes`;
        logger.debug(category, context, 'user =', user);

        const existingUser = await data.getUserByAuthorization(user.authorization);
        logger.debug(category, context, 'existingUser =', existingUser);
        if (existingUser.error) {
            return existingUser;
        }

        const updateUser = {
            ...existingUser,
            name: user.name || existingUser.name,
            email: user.email,
            picture: user.picture,
        };

        const updatedUser = await data.updateUser(updateUser);
        logger.debug(category, context, 'updatedUser =', updatedUser);
        if (updatedUser.error) {
            return updatedUser;
        }

        return updatedUser;
    }

    const getUserFamilyRoleGrants = async (userId, familyId) => {
        const context = `${module}.getUserFamilyRoleGrants`;
        const user = await data.getUserFamilyRoleGrants(userId, familyId);
        logger.debug(category, context, 'user =', user);
        if (user.error) {
            return user;
        }

        if (user.selectedFamily.role.isHead) {
            user.selectedFamily.role.grants = allGrants[user.subscription];
        }

        logger.debug(category, context, 'user.selectedFamily =', user.selectedFamily);
        logger.debug(category, context, 'return', user);
        return user;
    }

    const initializeNewUser = async (user) => {
        const context = `${module}.initializeNewUser`;
        const result = await data.initializeNewUser(user,
            family = { name: user.name }, 
            role = { name: 'Administrator', isHead: true }
        );
        logger.debug(category, context, 'return', result);
        return result;
    }

    const signInUserFunction = {
        signUp: signUpUser,
        signIn: signInUser,
    }

    return {
        getSignedIn,
        getSignInUrl,
        signIn,
    };
}
