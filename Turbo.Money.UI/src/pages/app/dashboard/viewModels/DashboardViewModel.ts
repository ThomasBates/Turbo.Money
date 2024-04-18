import { useState } from 'react';

import { useAppContext } from 'app/AppContextAccess';

import IPostDataProvider from 'data/interfaces/services/IPostDataProvider';

import IPost from 'models/post/IPost';

import IDashboardViewModel from './IDashboardViewModel';

export default function DashboardViewModel(postDataProvider: IPostDataProvider): IDashboardViewModel {
    const module = DashboardViewModel.name;
    const category = 'Dashboard';

    const [posts, setPosts] = useState<IPost[]>([]);

    const { logger, users } = useAppContext();

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
