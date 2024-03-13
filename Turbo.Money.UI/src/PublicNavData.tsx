import React, { useState } from "react";

export default function PublicNavData() {

    const initialNavData = {
        content: "root",
        minWidth: "35em", // "768px",
        list: [
            {
                content: (<img src="/assets/images/logo.png" alt="It's My Money" width="200" />),
                to: "/",
            },
            {
                content: "Home",
                to: "/",
            },
            {
                content: "Sign Up",
                width: 170,
                list: [
                    { content: "Sign up with X/Twitter", to: "/SignUpTwitter" },
                    { content: "Sign up with Google", to: "/SignUpGoogle" },
                    { content: "Sign up with Facebook", to: "/SignUpFacebook" },
                    { content: "Sign up with Email", to: "/SignUpEmail" },
                ]
            },
            {
                content: "Sign In",
                width: 170,
                list: [
                    { content: "Sign in with X/Twitter", to: "/SignInTwitter" },
                    { content: "Sign in with Google", to: "/SignInGoogle" },
                    { content: "Sign in with Facebook", to: "/SignInFacebook" },
                    { content: "Sign in with Email", to: "/SignInEmail" },
                ]
            },
            { content: "About", to: "/about" }
        ]
    };

    return initialNavData;
}
