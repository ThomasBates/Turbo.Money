import React, { useState } from "react";

export default function PublicHeaderData(users) {

    const initialHeaderData = {
        content: "root",
        minWidth: "20em",
        list: [
            {
                content: "Sign Up",
                width: 170,
                list: [
                    {
                        icon: (<img src="/assets/icons/logos/twitterx.png" alt="X" width="24" />),
                        content: "Sign up with X/Twitter",
                        action: () => users.auth.signUpOAuth('twitter'),
                    },
                    {
                        icon: (<img src="/assets/icons/logos/google.png" alt="Google" width="24" />),
                        content: "Sign up with Google",
                        action: () => users.auth.signUpOAuth('google'),
                    },
                    {
                        icon: (<img src="/assets/icons/logos/facebook.png" alt="Facebook" width="24" />),
                        content: "Sign up with Facebook",
                        action: () => users.auth.signUpOAuth('faceboook'),
                    },
                    {
                        icon: (<img src="/assets/icons/logos/email.png" alt="Email" width="24" />),
                        content: "Sign up with email",
                        to: "/SignUpEmail",
                    },
                ]
            },
            {
                content: "Sign In",
                width: 170,
                list: [
                    {
                        icon: (<img src="/assets/icons/logos/twitterx.png" alt="X" width="24" />),
                        content: "Sign in with X/Twitter",
                        action: () => users.auth.signInOAuth('twitter'),
                    },
                    {
                        icon: (<img src="/assets/icons/logos/google.png" alt="Google" width="24" />),
                        content: "Sign in with Google",
                        action: () => users.auth.signInOAuth('google'),
                    },
                    {
                        icon: (<img src="/assets/icons/logos/facebook.png" alt="Facebook" width="24" />),
                        content: "Sign in with Facebook",
                        action: () => users.auth.signInOAuth('facebook'),
                    },
                    {
                        icon: (<img src="/assets/icons/logos/email.png" alt="Email" width="24" />),
                        content: "Sign in with email",
                        to: "/SignInEmail",
                    },
                ]
            },
        ]
    };

    return initialHeaderData;
}
