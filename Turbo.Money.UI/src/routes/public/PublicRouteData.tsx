import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from 'react-router-dom';

//  ----------------------------------------------------------------------------

import AppContext from 'app/AppContext';

import PublicHeaderData from './PublicHeaderData';
import PublicNavData from './PublicNavData';

import HeaderNavBar from 'components/header/HeaderNavBar';
import NavBar from 'components/navBar/NavBar';
import SideBar from 'components/SideBar';
import Footer from 'components/Footer';

import AuthCallback from "pages/auth/AuthCallback";

import SignUpEmailViewModel from 'pages/auth/viewModels/SignUpEmailViewModel';
import SignUpEmailView from 'pages/auth/views/SignUpEmailView';

import SignInEmailViewModel from 'pages/auth/viewModels/SignInEmailViewModel';
import SignInEmailView from 'pages/auth/views/SignInEmailView';
import ResetPasswordView from 'pages/auth/views/ResetPasswordView';

import PostDataProvider from 'data/post/PostDataProvider';
import PublicViewModel from 'pages/public/viewModels/PublicViewModel';
import PublicView from 'pages/public/views/PublicView';

import About from 'pages/About';


//  ----------------------------------------------------------------------------

function NotFoundRedirect() {
    const location = useLocation();
    const { logger } = useContext(AppContext);

    logger.debug('NotFound', 'PublicRouteData.NotFoundRedirect', 'location =', location);

    return <Navigate to="/" replace state={{ from: location }} />;
}

export default function PublicRouteData(app) {

    return [{
        element:
            <div>
                <HeaderNavBar navData={PublicHeaderData(app.users)} />
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
            { path: "/", element: <PublicView viewModel={PublicViewModel(PostDataProvider(app.logger, app.errors))} /> },

            // OAuth 2.0 sources will redirect here
            { path: '/auth_callback', element: <AuthCallback /> },
            { path: '/auth/callback_google_signin', element: <AuthCallback /> },  // google will redirect here

            { path: "/signUpEmail", element: <SignUpEmailView viewModel={SignUpEmailViewModel()} /> },
            { path: "/signInEmail", element: <SignInEmailView viewModel={SignInEmailViewModel()} /> },

            { path: "/resetPassword", element: <ResetPasswordView /> },

            //  about
            { path: "/about", element: <About /> },
            { path: "*", element: <NotFoundRedirect /> },
        ],
    }];
}
