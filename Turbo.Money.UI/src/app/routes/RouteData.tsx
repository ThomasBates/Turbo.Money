import { useContext } from "react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

//  ----------------------------------------------------------------------------

import AppContext from "app/AppContext";
import PublicRouteData from './public/PublicRouteData';
import PrivateRouteData from './private/PrivateRouteData';

//  ----------------------------------------------------------------------------

export default function RouteData() {
    const app = useContext(AppContext);

    app.logger.debug('Route', 'RouteData', 'app.users.signedIn =', app.users.signedIn);

    const routeData = app.users.signedIn ? PrivateRouteData(app) : PublicRouteData(app);

    return (
        <RouterProvider router={createBrowserRouter(routeData)} />
    );

}
