import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { AppContextType } from 'app/AppContextType';

//  ----------------------------------------------------------------------------

import { useAppContext } from 'app/AppContextAccess';

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


//  ----------------------------------------------------------------------------

function NotFoundRedirect() {
    const location = useLocation();
    const { logger } = useAppContext();

    logger.debug('NotFound', 'PublicRouteData.NotFoundRedirect', 'location =', location);

    return <Navigate to="/" replace state={{ from: location }} />;
}

export default function PublicRouteData(app: AppContextType) {

    return [{
        element:
            <div>
                <Header headerData={PublicHeaderData(app.users)} />
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
                        app.logger,
                        PostDataProvider(
                            app.logger,
                            app.errors
                        )
                    )
                } />
            },

            // OAuth 2.0 sources will redirect here
            { path: '/auth_callback', element: <AuthCallback /> },
            { path: '/auth/callback_google_signin', element: <AuthCallback /> },  // google will redirect here

            { path: "/signUpEmail", element: <SignUpEmailView dataContext={() => SignUpEmailViewModel()} /> },
            { path: "/signInEmail", element: <SignInEmailView dataContext={() => SignInEmailViewModel()} /> },

            { path: "/resetPassword", element: <ResetPasswordView /> },

            //  about
            { path: "/about", element: <About /> },
            { path: "*", element: <NotFoundRedirect /> },
        ],
    }];
}
