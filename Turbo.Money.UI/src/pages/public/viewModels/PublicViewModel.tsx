import { useContext, useEffect, useState } from 'react';

import AppContext from "app/AppContext";

export default function PublicViewModel(postDataProvider) {
    const module = PublicViewModel.name;
    const category = 'Public';

    const [posts, setPosts] = useState([]);

    const { logger } = useContext(AppContext);

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
    }
}
