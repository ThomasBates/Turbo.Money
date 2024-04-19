import { useState } from 'react';

import IPostDataProvider from 'data/interfaces/services/IPostDataProvider';

import IPost from 'models/post/IPost';

import ILoggerService from 'services/logger/ILoggerService';
import IUserService from 'services/user/IUserService';

import IDashboardViewModel from './IDashboardViewModel';

export default function DashboardViewModel(
    logger: ILoggerService,
    users: IUserService,
    postDataProvider: IPostDataProvider
): IDashboardViewModel {
    const module = DashboardViewModel.name;
    const category = 'Dashboard';

    const [posts, setPosts] = useState<IPost[]>([]);

    const initializeData = async () => {
        const context = `${module}.${initializeData.name}`;
        try {
            // Get posts from server
            const posts = await postDataProvider.getPosts();
            logger.debug(category, context, 'posts =', posts);

            setPosts(posts);
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    }

    return {
        user: users.user,
        posts,

        initializeData,
    }
}
