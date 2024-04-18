import axios from "data/axios/AxiosCommon";

import IPostDataProvider from "data/interfaces/services/IPostDataProvider";

import ILoggerService from 'services/logger/ILoggerService';
import IErrorService from 'services/errors/IErrorService';

export default function PostDataProvider(logger: ILoggerService, errors: IErrorService): IPostDataProvider {
    const module = PostDataProvider.name;
    const category = 'Post';

    const getPosts = async () => {
        const context = `${module}.${getPosts.name}`;

        try {
            const response = await axios.get(`posts`)
            logger.debug(category, context, 'response.data =', response.data);
            return response.data.posts;

        } catch (ex) {
            return errors.handleCatch(ex, context);
        }
    }

    return {
        getPosts,
    };
}
