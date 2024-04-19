import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';

import LoggerConsoleProvider from 'services/logger/LoggerConsoleProvider';
import ILoggerService from 'services/logger/ILoggerService';
import LoggerService from 'services/logger/LoggerService';

import IErrorService from 'services/errors/IErrorService';
import ErrorService from 'services/errors/ErrorService';

import AuthDataProvider from 'data/axios/services/AuthDataProvider';
import IUserService, { SignInStatus } from 'services/user/IUserService';
import UserService from 'services/user/UserService';

import PendingRouteData from './routes/pending/PendingRouteData';
import PublicRouteData from './routes/public/PublicRouteData';
import PrivateRouteData from './routes/private/PrivateRouteData';

export default function App() {

    const loggerService: ILoggerService = LoggerService(LoggerConsoleProvider());
    const errorService: IErrorService = ErrorService(loggerService);
    const userService: IUserService = UserService(loggerService, errorService,
        AuthDataProvider(loggerService, errorService));

    loggerService.enableSeverity('verbose');
    loggerService.enableCategory('all');

    let routeData: RouteObject[];
    switch (userService.signInStatus) {
        case SignInStatus.Pending:
            routeData = PendingRouteData(userService, loggerService);
            break;
        case SignInStatus.SignedOut:
            routeData = PublicRouteData(userService, loggerService, errorService);
            break;
        case SignInStatus.SignedIn:
            routeData = PrivateRouteData(userService, loggerService, errorService);
            break;
        default:
            routeData = PendingRouteData(userService, loggerService);
            break;
    }

    return (
        <RouterProvider router={createBrowserRouter(routeData)} />
    );
}
