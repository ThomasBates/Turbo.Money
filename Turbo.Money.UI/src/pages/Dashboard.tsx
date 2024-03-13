import React, { useEffect, useState, useContext } from 'react'

import AuthContext from "../AppContext";
import axios from "../axios/AxiosCommon";
import AuthDataProvider from "../auth/data/AuthDataProvider";

const Dashboard = () => {
    const { user, signedIn, checkSignInState } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);

    const authDataProvider = AuthDataProvider();

    useEffect(() => {
        (async () => {
            if (signedIn === true) {
                try {
                    // Get posts from server
                    const { data: { posts } } = await axios.get(`posts`)
                    setPosts(posts);
                } catch (err) {
                    console.error(err);
                }
            }
        })();
    }, [signedIn])

    const handleLogout = async () => {
        try {
            const data = await authDataProvider.signOut();
            console.log('Dashboard.handleLogout: data =', data);

            // Check sign-in state again
            checkSignInState(data);
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