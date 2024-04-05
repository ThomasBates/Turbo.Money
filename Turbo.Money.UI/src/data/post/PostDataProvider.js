import axios from "../axios/AxiosCommon";

export default function PostDataProvider(logger, errors) {
    const module = PostDataProvider.name;
    const category = 'Post';

    const getPosts = async () => {
        const context = `${module}.${getPosts.name}`;

        try {
            const response = await axios.get(`posts`)
            logger.debug(category, context, 'response.data =', response.data);
            return response.data.posts;

        } catch (ex) {
            logger.error(category, context, 'error =', ex);
            return errors.create(context, 'Catch', ex.message);
        }
    }

    return {
        getPosts,
    };
}
