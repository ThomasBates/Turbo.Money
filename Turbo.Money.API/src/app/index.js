
module.exports = async (app) => {

    const { logger, errors, business } = await require("./bootstrapper")(app);

    logger.enableCategory('Server');

    await require("./sampleData")(logger, errors, business);

    //return;

    // set port, listen for requests
    const PORT = process.env.PORT || 8080;

    app.listen(PORT, () => {
        logger.info('Server', 'Server', `Server is running on port ${PORT}.`);
    });
}
