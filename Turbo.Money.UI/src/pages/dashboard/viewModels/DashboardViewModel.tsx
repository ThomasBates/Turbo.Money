import React, { useContext, useEffect, useState } from 'react';

import AppContext from "../../../AppContext";

export default function DashboardViewModel({ dashboardDataProvider }) {
    const module = DashboardViewModel.name;
    const [posts, setPosts] = useState([]);

    const { users } = useContext(AppContext);

    //console.log(`${module}:`, 'users.user =', users.user);

    useEffect(() => {
        const context = `${module}.${useEffect.name}:`;
        (async () => {
            try {
                // Get posts from server
                const posts = await dashboardDataProvider.getPosts();
                console.log(context, 'posts =', posts);
                setPosts(posts);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    return {
        posts,
        user: users.user,
    }
}
