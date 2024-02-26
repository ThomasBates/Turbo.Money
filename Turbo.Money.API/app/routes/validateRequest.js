

// Verify auth
const validateRequest = (req, res, next) => {

    const jwt = require("jsonwebtoken");

    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        jwt.verify(token, process.env.TOKEN_SECRET);

        return next();
    } catch (err) {
        res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = validateRequest;