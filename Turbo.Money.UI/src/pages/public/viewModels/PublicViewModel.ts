import { useState } from 'react';

import { useAppContext } from 'app/AppContextAccess';

import IPostDataProvider from 'data/post/IPostDataProvider';

import IPost from 'models/post/IPost';

import IPublicViewModel from './IPublicViewModel';

export default function PublicViewModel(postDataProvider: IPostDataProvider): IPublicViewModel {
    const module = PublicViewModel.name;
    const category = 'Public';

    const [posts, setPosts] = useState<IPost[]>([]);

    const { logger } = useAppContext();

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
        posts,

        initializeData,
    }
}
