
module.exports = (logger, data) => {

    // Validate user data
    const validate = async (testUser) => {
        logger.debug("Business", "UserBusiness.validate: testUser = ", testUser);

        let [error, users] = await data.getList();
        if (error) {
            return error;
        }
        if (!users || users.length == 0) {
            return null;
        }
        logger.debug("Business", "UserBusiness.validate: users = ", users);

        let matching = users.find(user =>
            user.email.toLowerCase() == testUser.email.toLowerCase() &&
            user.id != testUser.id);
        logger.debug("Business", "UserBusiness.validate: matching = ", matching);
        if (matching) {
            return "Validation Error: User email must be unique.";
        }

        return null;
    }

    const common = require('./CommonBusiness')(logger, data);
    return { ...common, validate };
}
