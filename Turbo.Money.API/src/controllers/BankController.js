
module.exports = function BankController(logger, business) {
    const jwt = require("jsonwebtoken");

    const createSampleData = async (req, res) => {
        const userCookie = jwt.decode(req.cookies.user);

        const result = await business.createSampleData(userCookie);

        return res.json(result);
    };

    return {
        createSampleData
    };
}
