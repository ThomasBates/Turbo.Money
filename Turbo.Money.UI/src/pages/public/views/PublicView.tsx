import React, { useContext } from 'react'

import AppContext from "../../../AppContext";

export default function PublicView({ viewModel }) {
    return (
        <div className ="tb-public">
            <h1 className='tb-page-title'>It's My Money</h1>
            <div>
                {viewModel.posts.map((post, idx) => <div key={post?.title}>
                    <h5>{post?.title}</h5>
                    <p>{post?.body}</p>
                </div>)}
            </div>
        </div>
    );
}
