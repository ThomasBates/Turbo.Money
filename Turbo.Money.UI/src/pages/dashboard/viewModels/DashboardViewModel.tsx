import { useEffect, useState } from 'react';

import { useAppContext } from 'app/AppContextAccess';

export default function DashboardViewModel({ postDataProvider }) {
    const module = DashboardViewModel.name;
    const category = 'Dashboard';

    const [posts, setPosts] = useState([]);

    const { logger, users } = useAppContext();

    useEffect(() => {
        const context = `${module}.${useEffect.name}`;
        (async () => {
            try {
                // Get posts from server
                const posts = await postDataProvider.getPosts();
                logger.debug(category, context, 'posts =', posts);

                setPosts(posts);
            } catch (ex) {
                logger.error(category, context, 'ex =', ex);
            }
        })();
    }, []);

    return {
        posts,
        user: users.user,
    }
}
