import React from "react";
import {
    Navigate,
    Outlet,
    useLocation
} from 'react-router-dom';

//  ----------------------------------------------------------------------------

import PublicNavData from './PublicNavData';

import Header from './components/Header';
import NavBar from './components/navBar/NavBar';
import SideBar from './components/SideBar';
import Footer from './components/Footer';

import AuthDataProvider from './auth/data/AuthDataProvider';
import SignInViewModel from './auth/viewModels/SignInViewModel';
import SignInView from './auth/views/SignInView';

import AuthCallback from "./auth/AuthCallback";

import SignInOAuthViewModel from './auth/viewModels/SignInOAuthViewModel';
import SignInOAuthView from './auth/views/SignInOAuthView';

import SignUpEmailViewModel from './auth/viewModels/SignUpEmailViewModel';
import SignUpEmailView from './auth/views/SignUpEmailView';

import SignInEmailViewModel from './auth/viewModels/SignInEmailViewModel';
import SignInEmailView from './auth/views/SignInEmailView';
import Recover from './auth/views/RecoverPasswordView';

import Public from './pages/Public';

import About from './pages/About';

//  ----------------------------------------------------------------------------

function NotFoundRedirect() {
    const location = useLocation();

    console.log("RouteData.NotFoundRedirect: location = ", location);

    return <Navigate to="/" replace state={{ from: location }} />;
}

export default function PublicRouteData() {

    const authDataProvider = AuthDataProvider();

    return [{
        element:
            <div>
                <Header />
                <NavBar navData={PublicNavData()} />
                <div className="tb-content">
                    <SideBar />
                    <div className="tb-main">
                        <Outlet />
                    </div>
                </div>
                <Footer />
            </div>,
        children: [
            //  dashboard
            { path: "/", element: <Public /> },

            // OAuth 2.0 sources will redirect here
            { path: '/auth_callback', element: <AuthCallback /> },
            { path: '/auth/callback_google_signin', element: <AuthCallback /> },  // google will redirect here

            { path: "/signUp", element: <SignInView viewModel={SignInViewModel(authDataProvider, 'signUp')} /> },
            { path: "/signIn", element: <SignInView viewModel={SignInViewModel(authDataProvider, 'signIn')} /> },

            { path: "/signUpFacebook", element: <SignInOAuthView viewModel={SignInOAuthViewModel(authDataProvider, 'facebook', 'signUp')} /> },
            { path: "/signUpGoogle", element: <SignInOAuthView viewModel={SignInOAuthViewModel(authDataProvider, 'google', 'signUp')} /> },
            { path: "/signUpTwitter", element: <SignInOAuthView viewModel={SignInOAuthViewModel(authDataProvider, 'twitter', 'signUp')} /> },
            { path: "/signUpEmail", element: <SignUpEmailView viewModel={SignUpEmailViewModel(authDataProvider)} /> },

            { path: "/signInFacebook", element: <SignInOAuthView viewModel={SignInOAuthViewModel(authDataProvider, 'facebook', 'signIn')} /> },
            { path: "/signInGoogle", element: <SignInOAuthView viewModel={SignInOAuthViewModel(authDataProvider, 'google', 'signIn')} /> },
            { path: "/signInTwitter", element: <SignInOAuthView viewModel={SignInOAuthViewModel(authDataProvider, 'twitter', 'signIn')} /> },
            { path: "/signInEmail", element: <SignInEmailView viewModel={SignInEmailViewModel()} /> },

            { path: "/recover", element: <Recover /> },

            //  about
            { path: "/about", element: <About /> },
            { path: "*", element: <NotFoundRedirect /> },
        ],
    }];
}
