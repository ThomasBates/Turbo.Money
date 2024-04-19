import { Navigate, Outlet, useLocation } from 'react-router-dom';

//  ----------------------------------------------------------------------------

import PublicHeaderData from './PublicHeaderData';
import PublicNavData from './PublicNavData';

import Header from 'components/header/Header';
import NavBar from 'components/navBar/NavBar';
import SideBar from 'components/SideBar';
import Footer from 'components/Footer';

import AuthCallback from "pages/services/auth/views/AuthCallback";

import SignUpEmailViewModel from 'pages/services/auth/viewModels/SignUpEmailViewModel';
import SignUpEmailView from 'pages/services/auth/views/SignUpEmailView';

import SignInEmailViewModel from 'pages/services/auth/viewModels/SignInEmailViewModel';
import SignInEmailView from 'pages/services/auth/views/SignInEmailView';
import ResetPasswordView from 'pages/services/auth/views/ResetPasswordView';

import PostDataProvider from 'data/axios/services/PostDataProvider';
import PublicViewModel from 'pages/app/public/viewModels/PublicViewModel';
import PublicView from 'pages/app/public/views/PublicView';

import About from 'pages/app/About';
import ILoggerService from '../../../services/logger/ILoggerService';
import IErrorService from '../../../services/errors/IErrorService';
import IUserService from '../../../services/user/IUserService';


//  ----------------------------------------------------------------------------

function NotFoundRedirect({ logger }: { logger: ILoggerService }) {
    const location = useLocation();

    logger.debug('NotFound', 'PublicRouteData.NotFoundRedirect', 'location =', location);

    return <Navigate to="/" replace state={{ from: location }} />;
}

export default function PublicRouteData(
    userService: IUserService,
    loggerService: ILoggerService,
    errorService: IErrorService
) {

    return [{
        element:
            <div>
                <Header headerData={PublicHeaderData(userService)} />
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
            {
                path: "/",
                element: <PublicView dataContext={() =>
                    PublicViewModel(
                        loggerService,
                        PostDataProvider(
                            loggerService,
                            errorService
                        )
                    )
                } />
            },

            // OAuth 2.0 sources will redirect here
            { path: '/auth_callback', element: <AuthCallback /> },
            { path: '/auth/callback_google_signin', element: <AuthCallback /> },  // google will redirect here

            {
                path: "/signUpEmail",
                element: <SignUpEmailView dataContext={() =>
                    SignUpEmailViewModel(
                        userService
                    )
                } />
            },
            {
                path: "/signInEmail",
                element: <SignInEmailView dataContext={() =>
                    SignInEmailViewModel(
                        userService
                    )
                } />
            },

            { path: "/resetPassword", element: <ResetPasswordView /> },

            //  about
            { path: "/about", element: <About /> },
            { path: "*", element: <NotFoundRedirect logger={loggerService} /> },
        ],
    }];
}
