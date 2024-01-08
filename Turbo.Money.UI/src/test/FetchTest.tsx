declare var require: any
var React = require('react');

import { useState, useEffect } from 'react';

function Dashboard() {

    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
                const data = await response.json();
                console.log(data);
                setPosts(data);
            }
            catch (error) {
                console.log(error);
            }
        };
        fetchPost();

        //fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
        //    .then((response) => response.json())
        //    .then((data) => {
        //        console.log(data);
        //        setPosts(data);
        //    })
        //    .catch((err) => {
        //        console.log(err.message);
        //    });
    }, []);

    // ...
    const addPosts = async (title, body) => {

        try {
            let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    title: title,
                    body: body,
                    userId: Math.random().toString(36).slice(2),
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            let data = await response.json();
            setPosts((posts) => [data, ...posts]);
            setTitle('');
            setBody('');
        }
        catch (error) {
            console.log(error);
        }

        //await fetch('https://jsonplaceholder.typicode.com/posts', {
        //    method: 'POST',
        //    body: JSON.stringify({
        //        title: title,
        //        body: body,
        //        userId: Math.random().toString(36).slice(2),
        //    }),
        //    headers: {
        //        'Content-type': 'application/json; charset=UTF-8',
        //    },
        //})
        //    .then((response) => response.json())
        //    .then((data) => {
        //        setPosts((posts) => [data, ...posts]);
        //        setTitle('');
        //        setBody('');
        //    })
        //    .catch((err) => {
        //        console.log(err.message);
        //    });
    };

    const deletePost = async (id) => {

        let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
        });
        if (response.status === 200) {
            setPosts(
                posts.filter((post) => {
                    return post.id !== id;
                })
            );
        }

        //await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        //    method: 'DELETE',
        //}).then((response) => {
        //    if (response.status === 200) {
        //        setPosts(
        //            posts.filter((post) => {
        //                return post.id !== id;
        //            })
        //        );
        //    } else {
        //        return;
        //    }
        //});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addPosts(title, body);
    };

    return (
        <div className="posts-container">
            <h1>Fetch Test</h1>

            <div className="add-post-container">
                <form onSubmit={handleSubmit}>
                    <input type="text" className="form-control" value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea name="" className="form-control" id=""
                        value={body} onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                    <button type="submit">Add Post</button>
                </form>
            </div>

            {posts.map((post) => {
                return (
                    <div className="post-card" key={post.id}>
                        <h2 className="post-title">{post.title}</h2>
                        <p className="post-body">{post.body}</p>
                        <div className="button">
                            <div className="delete-btn" onClick={() => deletePost(post.id)}>
                                Delete
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Dashboard;