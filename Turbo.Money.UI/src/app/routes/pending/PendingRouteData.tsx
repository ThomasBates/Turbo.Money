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

import About from 'pages/About';
import NotFound from 'pages/NotFound';

//  ----------------------------------------------------------------------------

//function About() {
//    return (<>
//        <h1>About <span>It's My Money</span></h1>
//    </>);
//}

//function Header() {
//    return (<>
//        <h1>Header</h1>
//    </>);
//}

//function SideBar() {
//    return (<>
//        <h1>Side Bar</h1>
//    </>);
//}

//function Footer() {
//    return (<>
//        <h1>Footer</h1>
//    </>);
//}

//function NotFound() {
//    return (<>
//        <h1>Page not found.</h1>
//    </>);
//}

//  ----------------------------------------------------------------------------

export default function PendingRouteData(_app: AppContextType) {

    return [{
        element:
            <div>
                <Header headerData={PendingHeaderData()} />
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
            //  about
            { path: "/", element: <About /> },
            { path: "*", element: <NotFound /> },
        ],
    }];
}
