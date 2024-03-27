
module.exports = async (app) => {
    const axios = require("axios");
    const router = require("express").Router();
    const validateRequest = require("./validateRequest");

    const getPosts = async (_, res) => {
        try {
            const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
            res.json({ posts: data?.slice(0, 5) });
        } catch (err) {
            console.error('Error: ', err);
        }
    };

    router.get('/', validateRequest, getPosts);

    app.use(`/api/posts`, router);
}