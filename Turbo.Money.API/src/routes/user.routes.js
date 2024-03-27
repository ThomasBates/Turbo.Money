
module.exports = (app, logger, errors, controller) => {
    const router = require("express").Router();

    router.get('/signed_in', controller.getSignedIn);
    router.get('/sign_in_url', controller.getSignInUrl);
    router.post('/sign_in', controller.signIn);
    router.post("/sign_out", controller.signOut);

    app.use(`/api/user`, router);
}