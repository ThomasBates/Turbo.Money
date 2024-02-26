import React from "react";
import {Link }from "react-router-dom"


function Public() {
    return (
        <div className ="tb-public">
            <img src="/assets/images/logo.png" className="App-logo" alt="logo" />
            <h1>Public</h1>
            <Link className="tb-button" to="/signUp">Sign Up</Link>
            <br />
            <br />
            <br />
            <Link className="tb-button" to="/signIn">Sign In</Link>
        </div>
    );
}

export default Public;