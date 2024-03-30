import React, { useContext } from "react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

//  ----------------------------------------------------------------------------

import AppContext from "./AppContext";
import PublicRouteData from './PublicRouteData';
import PrivateRouteData from './PrivateRouteData';

//  ----------------------------------------------------------------------------

export default function RouteData() {
    const app = useContext(AppContext);

    //console.log("RouteData.RouteData: signedIn = ", signedIn);

    const routeData = app.users.signedIn ? PrivateRouteData(app) : PublicRouteData(app);

    return (
        <RouterProvider router={createBrowserRouter(routeData)} />
    );

}
