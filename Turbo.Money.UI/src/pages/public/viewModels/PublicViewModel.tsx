import React, { useEffect, useState } from 'react';

export default function PublicViewModel(publicDataProvider) {
    const module = PublicViewModel.name;
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const context = `${module}.${useEffect.name}`;
        (async () => {
            try {
                // Get posts from server
                const posts = await publicDataProvider.getPosts();
                console.log(context, 'posts =', posts);
                setPosts(posts);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    return {
        posts,
    }
}
