import React, { useContext, useEffect, useState } from 'react';

import AppContext from "../../../AppContext";

export default function PublicViewModel(publicDataProvider) {
    const module = PublicViewModel.name;
    const category = 'Public';

    const [posts, setPosts] = useState([]);

    const { logger } = useContext(AppContext);

    useEffect(() => {
        const context = `${module}.${useEffect.name}`;
        (async () => {
            try {
                // Get posts from server
                const posts = await publicDataProvider.getPosts();
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
