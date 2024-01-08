declare var require: any
var React = require('react');

import axios from 'axios';
import { useState, useEffect } from 'react';

const client = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/posts"
});

function AxiosTest() {

    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            let response = await client.get('?_limit=10');
            setPosts(response.data);
        };
        fetchPost();

        //client
        //    .get('?_limit=10')
        //    .then((response) => {
        //        setPosts(response.data);
        //    });
    }, []);

    // ...
    const addPosts = async (title, body) => {
        let response = await client.post('', {
            title: title,
            body: body,
        });
        setPosts((posts) => [response.data, ...posts]);
        setTitle('');
        setBody('');

        //client
        //    .post('', {
        //        title: title,
        //        body: body,
        //    })
        //    .then((response) => {
        //        setPosts((posts) => [response.data, ...posts]);
        //        setTitle('');
        //        setBody('');
        //    });
    };

    const deletePost = async (id) => {
        await client.delete(`${id}`);
        setPosts(
            posts.filter((post) => {
                return post.id !== id;
            })
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addPosts(title, body);
    };

    return (
        <div className="posts-container">
            <h1>Axios Test</h1>

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

export default AxiosTest;