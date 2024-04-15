
module.exports = (app, logger, errors, controller) => {
    const router = require("express").Router();

    router.get('/signed_in', controller.getSignedIn);
    router.get('/sign_in_url', controller.getSignInUrl);
    router.post('/sign_in', controller.signIn);
    router.post("/sign_out", controller.signOut);
    router.post("/abort", controller.abort);
    router.post("/switch_family", controller.switchFamily);

    app.use(`/api/user`, router);
}