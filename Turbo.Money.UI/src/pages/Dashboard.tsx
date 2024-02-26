import React, { useEffect, useState, useContext } from 'react'

import AuthContext from "../AppContext";
import http from "../axios/AxiosCommon";

const Dashboard = () => {
    const { user, signedIn, checkSignInState } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            if (signedIn === true) {
                try {
                    // Get posts from server
                    const { data: { posts } } = await http.get(`posts`)
                    setPosts(posts);
                } catch (err) {
                    console.error(err);
                }
            }
        })();
    }, [signedIn])

    const handleLogout = async () => {
        try {
            await http.post(`auth/sign_out`);
            // Check sign-in state again
            checkSignInState();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <button className="tb-button" onClick={handleLogout} >Logout</button>
            <h4>{user?.name}</h4>
            <br />
            <img src={user?.picture} alt={user?.name} />
            <br />
            <div>
                {posts.map((post, idx) => <div key={post?.title}>
                    <h5>{post?.title}</h5>
                    <p>{post?.body}</p>
                </div>)}
            </div>
        </div>
    )
}


export default Dashboard;