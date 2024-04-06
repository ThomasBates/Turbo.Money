
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';

//  ----------------------------------------------------------------------------

import { AppContextType } from 'app/AppContextType';
import { useAppContext } from 'app/AppContextAccess';
import { SignInStatus } from 'services/user/IUserService';

import PendingRouteData from './pending/PendingRouteData';
import PublicRouteData from './public/PublicRouteData';
import PrivateRouteData from './private/PrivateRouteData';

//  ----------------------------------------------------------------------------

const routeMap: Record<SignInStatus, (app: AppContextType) => RouteObject[]> = {
    [SignInStatus.Pending]: PendingRouteData,
    [SignInStatus.SignedIn]: PrivateRouteData,
    [SignInStatus.SignedOut]: PublicRouteData,
}

export default function RouteData() {
    const app = useAppContext();

    const routeData = routeMap[app.users.signInStatus](app);

    return (
        <RouterProvider router={createBrowserRouter(routeData)} />
    );

}
