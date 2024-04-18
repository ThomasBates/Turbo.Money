/* eslint-disable @typescript-eslint/no-unused-vars */
import { Outlet } from 'react-router-dom';

import { AppContextType } from 'app/AppContextType';

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

//  ----------------------------------------------------------------------------

export default function PendingRouteData(app: AppContextType) {

    return [{
        element:
            <div>
                <Header headerData={PendingHeaderData(app.users)} />
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
            // OAuth 2.0 sources will redirect here
            { path: '/auth_callback', element: <AuthCallback /> },
            { path: '/auth/callback_google_signin', element: <AuthCallback /> },  // google will redirect here

            //  about
            { path: "/", element: <About /> },
            { path: "*", element: <NotFound /> },
        ],
    }];
}
