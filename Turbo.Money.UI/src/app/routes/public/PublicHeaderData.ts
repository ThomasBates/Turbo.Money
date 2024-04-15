
import { IMenuData } from "components/menu/IMenuData";
import IUserService from 'services/user/IUserService';

export default function PublicHeaderData(users: IUserService): IMenuData {

    const initialHeaderData = {
        content: "root",
        minWidth: "20em",
        list: [
            {
                content: "Sign Up",
                width: 170,
                list: [
                    {
                        icon: 'twitter_x_logo',
                        content: "Sign up with X/Twitter",
                        action: () => users.auth.signUpOAuth('twitter'),
                    },
                    {
                        icon: 'google_logo',
                        content: "Sign up with Google",
                        action: () => users.auth.signUpOAuth('google'),
                    },
                    {
                        icon: 'facebook_logo',
                        content: "Sign up with Facebook",
                        action: () => users.auth.signUpOAuth('faceboook'),
                    },
                    {
                        icon: 'email_logo',
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
                        icon: 'twitter_x_logo',
                        content: "Sign in with X/Twitter",
                        action: () => users.auth.signInOAuth('twitter'),
                    },
                    {
                        icon: 'google_logo',
                        content: "Sign in with Google",
                        action: () => users.auth.signInOAuth('google'),
                    },
                    {
                        icon: 'facebook_logo',
                        content: "Sign in with Facebook",
                        action: () => users.auth.signInOAuth('facebook'),
                    },
                    {
                        icon: 'email_logo',
                        content: "Sign in with email",
                        to: "/SignInEmail",
                    },
                ]
            },
        ]
    };

    return initialHeaderData;
}
