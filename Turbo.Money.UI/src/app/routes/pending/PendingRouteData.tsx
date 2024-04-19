import { Outlet } from 'react-router-dom';

//  ----------------------------------------------------------------------------

import PendingHeaderData from './PendingHeaderData';
import PendingNavData from './PendingNavData';

import Header from 'components/header/Header';
import NavBar from 'components/navBar/NavBar';
import SideBar from 'components/SideBar';
import Footer from 'components/Footer';

import AuthCallback from "pages/services/auth/views/AuthCallback";

import About from 'pages/app/About';
import NotFound from 'pages/app/NotFound';

import IUserService from 'services/user/IUserService';
import ILoggerService from 'services/logger/ILoggerService';

//  ----------------------------------------------------------------------------

export default function PendingRouteData(
    userService: IUserService,
    loggerService: ILoggerService
) {

    return [{
        element:
            <div>
                <Header headerData={PendingHeaderData(userService)} />
                <NavBar navData={PendingNavData()} />
                <div className="tb-content">
                    <SideBar />
                    <div className="tb-main">
                        <Outlet />
                    </div>
                </div>
                <Footer />
            </div>,
        children: [
            {
                path: '/auth_callback',     // OAuth 2.0 sources will redirect here
                element: <AuthCallback logger={loggerService} userService={userService}  />
            },
            {
                path: '/auth/callback_google_signin',   // google will redirect here
                element: <AuthCallback logger={loggerService} userService={userService} />
            },  

            //  about
            { path: "/", element: <About /> },
            { path: "*", element: <NotFound /> },
        ],
    }];
}
