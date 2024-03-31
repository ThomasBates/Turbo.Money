import React, { useContext, useEffect, useState } from 'react';

import AppContext from "../../../AppContext";

export default function DashboardViewModel({ dashboardDataProvider }) {
    const module = DashboardViewModel.name;
    const category = 'Dashboard';

    const [posts, setPosts] = useState([]);

    const { logger, users } = useContext(AppContext);

    useEffect(() => {
        const context = `${module}.${useEffect.name}`;
        (async () => {
            try {
                // Get posts from server
                const posts = await dashboardDataProvider.getPosts();
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
