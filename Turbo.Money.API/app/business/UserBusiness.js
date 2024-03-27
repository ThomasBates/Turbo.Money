
module.exports = (logger, data) => {
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
        logger.debug('User', 'UserBusiness.getSignInUrl: ***************************************************');
        logger.debug('User', `UserBusiness.getSignInUrl: source = "${source}", mode = "${mode}"`);

        if (!(source in strategy))
            return { error: `Source "${source}" not supported` };

        if (!(mode in signInUserFunction))
            return { error: `Mode "${mode}" not supported` };

        const url = strategy[source].getSignInUrl();

        result = { url };

        logger.debug('User', "UserBusiness.getSignInUrl: return", result);
        return result;
    };

    const getSignedIn = async (userCookie, tokenCookie) => {
        logger.debug('User', 'UserBusiness.getSignedIn: ****************************************************');
        logger.debug('User', "UserBusiness.getSignedIn: userCookie =", userCookie);
        logger.debug('User', "UserBusiness.getSignedIn: tokenCookie =", tokenCookie);


        const handleMessage = (message) => {
            const result = { message };
            logger.debug('User', 'UserBusiness.getSignedIn: return', result);
            endInProgress(userCookie);
            return result;
        };

        const handleError = (error) => {
            const result = { error };
            logger.error('User', 'UserBusiness.getSignedIn: return', result);
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
        logger.verbose('User', 'UserBusiness.getSignedIn: refreshAccessToken returned:', tokens);
        if (tokens.error)
            return handleError(`refreshAccessToken returned: ${tokens.error}`);

        //  Get user data with new access token
        let authUser = await strategy[userCookie.source].getUserData(tokens.accessToken);
        logger.verbose('User', 'UserBusiness.getSignedIn: getUserData returned:', authUser);
        if (authUser.error)
            return handleError(`getUserData returned: ${authUser.error}`);

        // update user in DB
        const updateResult = await updateUserAuthAttributes(authUser);
        logger.verbose('User', 'UserBusiness.getSignedIn: updatedUser =', updateResult);
        if (updateResult.error) {
            return (updateResult.error.startsWith("Cannot find user object") ? handleMessage : handleError)
                (`updateUserAuthAttributes returned: ${updateResult.error}`);
        }

        //  get user family, role, & grants to return to UI
        const user = await getUserFamilyRoleGrants(userCookie.userId, userCookie.familyId);
        logger.verbose('User', 'UserBusiness.getSignedIn: user =', user);
        if (user.error)
            return handleError(`getUserFamilyRollGrants returned: ${user.error}`);

        //  Return { user } if able to get user data with access token.
        const result = { user, tokens };

        logger.debug('User', 'UserBusiness.getSignedIn: return', result);
        endInProgress(userCookie);
        return result;
    };

    const signIn = async (source, mode, params) => {
        logger.debug('User', 'UserBusiness.signIn: *********************************************************');
        logger.debug('User', "UserBusiness.signIn: params =", params);

        let authUser = null;

        const handleError = (error) => {
            const result = { error };
            logger.error('User', 'UserBusiness.signIn: return', result);
            if (authUser)
                endInProgress(authUser);
            return result;
        }

        try {
            //  Exchange params (code) for access (and refresh) token.
            let tokens = await strategy[source].getAccessToken(params);
            logger.verbose('User', 'UserBusiness.signIn: getAccessTokens returned:', tokens);
            if (tokens.error)
                return handleError(`getAccessToken returned: ${tokens.error}`);

            //  Get user source id, name, email, and picture data.
            authUser = await strategy[source].getUserData(tokens.accessToken);
            logger.verbose('User', 'UserBusiness.signIn: authUser =', authUser);
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
            logger.verbose('User', 'UserBusiness.signIn: signInResult =', signInResult);
            if (signInResult.error)
                return handleError(`signInUserFunction[${mode}] returned: ${signInResult.error}`);

            //  get user family, role, & grants to return to UI
            const user = await getUserFamilyRoleGrants(signInResult.userId);
            logger.verbose('User', 'UserBusiness.getSignedIn: user =', user);
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

            logger.debug('User', 'UserBusiness.signIn: return', result);
            endInProgress(authUser);
            return result;

        } catch (ex) {
            logger.error('User', `UserBusiness.signIn: ex =`, ex);
            return handleError(`catch: ${ex.message || 'Server error'}`);
        }
    };

    //  Local Functions  ---------------------------------------------------------------------------

    const validateUserCookie = async (userCookie) => {
        logger.debug('User', "UserBusiness.validateUserCookie: userCookie =", userCookie);

        if (!userCookie.source)
            return { error: `UserBusiness.validateUserCookie: Invalid user cookie: missing source` };

        if (!userCookie.sourceId)
            return { error: `UserBusiness.validateUserCookie: Invalid user cookie: missing sourceId` };

        if (!userCookie.userId)
            return { error: `UserBusiness.validateUserCookie: Invalid user cookie: missing userId` };

        if (!userCookie.familyId)
            return { error: `UserBusiness.validateUserCookie: Invalid user cookie: missing familyId` };

        if (!userCookie.source || !(userCookie.source in strategy))
            return { error: `UserBusiness.validateUserCookie: Invalid user cookie: source ("${userCookie.source}") in user cookie is not supported` };

        const user = await data.getUserByAuthorization(userCookie);
        logger.debug('User', "UserBusiness.validateUserCookie: user =", user);
        if (user.error)
            return { error: `UserBusiness.validateUserCookie: Invalid user cookie: ${user.error}`};

        const family = await data.getUserFamily(user, userCookie.familyId);
        logger.debug('User', "UserBusiness.validateUserCookie: family =", family);
        if (family.error)
            return { error: `UserBusiness.validateUserCookie: Invalid user cookie: ${family.error}` };

        return {}
    }

    const signUpUser = async (user) => {
        logger.debug('User', "UserBusiness.signUpUser: user =", user);

        const existingUser = await data.getUserByAuthorization(user.authorization);
        logger.debug('User', "UserBusiness.signUpUser: existingUser =", existingUser);
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
        logger.debug('User', "UserBusiness.signUpUser: newUser =", newUser);

        const createdUser = await data.createUser(newUser);
        logger.debug('User', "UserBusiness.signUpUser: createdUser =", createdUser);
        if (createdUser.error) {
            return createdUser;
        }

        const initializeResult = await initializeNewUser(createdUser);
        logger.debug('User', "UserBusiness.signUpUser: initializeResult =", initializeResult);
        if (initializeResult.error) {
            return initializeResult;
        }

        const signUpResult = await data.getUserDefaultFamilyId(createdUser);
        logger.debug('User', "UserBusiness.signUpUser: signUpResult =", signUpResult);

        return signUpResult;
    }

    const signInUser = async (user) => {
        logger.debug('User', "UserBusiness.signInUser: user =", user);

        const existingUser = await data.getUserByAuthorization(user.authorization);
        logger.debug('User', "UserBusiness.signInUser: existingUser =", existingUser);
        if (existingUser.error) {
            return existingUser;
        }

        if (existingUser.authorization.passwordHash != user.authorization.passwordHash) {
            logger.debug('User', "UserBusiness.signInUser: Invalid credentials");
            return { error: "Invalid credentials" };
        }

        const signInResult = await data.getUserDefaultFamilyId(existingUser);
        logger.debug('User', "UserBusiness.signUpUser: signInResult =", signInResult);

        return signInResult;
    }

    const updateUserAuthAttributes = async (user) => {
        logger.debug('User', "UserBusiness.updateUserAuthAttributes: user =", user);

        const existingUser = await data.getUserByAuthorization(user.authorization);
        logger.debug('User', "UserBusiness.updateUserAuthAttributes: existingUser =", existingUser);
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
        logger.debug('User', "UserBusiness.updateUserAuthAttributes: updatedUser =", updatedUser);
        if (updatedUser.error) {
            return updatedUser;
        }

        return updatedUser;
    }

    const getUserFamilyRoleGrants = async (userId, familyId) => {
        const user = await data.getUserFamilyRoleGrants(userId, familyId);
        logger.debug('User', "UserBusiness.getUserFamilyRoleGrants: user =", user);
        if (user.error) {
            return user;
        }

        if (user.selectedFamily.role.isHead) {
            user.selectedFamily.role.grants = allGrants[user.subscription];
        }

        logger.debug('User', "UserBusiness.getUserFamilyRoleGrants: return", user);
        logger.debug('User', "UserBusiness.getUserFamilyRoleGrants: user.selectedFamily =", user.selectedFamily);
        return user;
    }

    const initializeNewUser = async (user) => {
        const result = await data.initializeNewUser(user,
            family = { name: user.name }, 
            role = { name: 'Administrator', isHead: true }
        );
        logger.debug('User', 'UserBusiness.initializeNewUser: return', result);
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
