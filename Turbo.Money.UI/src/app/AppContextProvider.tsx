import { ReactNode } from "react";

import AppContextType from "./AppContext";

import LoggerConsoleProvider from 'services/logger/LoggerConsoleProvider';
import ILoggerService from 'services/logger/ILoggerService';
import LoggerService from 'services/logger/LoggerService';

import IErrorService from 'services/errors/IErrorService';
import ErrorService from 'services/errors/ErrorService';

import AuthDataProvider from 'data/auth/AuthDataProvider';
import IUserService from 'services/user/IUserService';
import UserService from 'services/user/UserService';

interface Props {
    children: ReactNode;
}

export default function AppContextProvider({ children }: Props) {

    const logger: ILoggerService = LoggerService(LoggerConsoleProvider());
    const errors: IErrorService = ErrorService(logger);
    const users: IUserService = UserService(logger, errors, AuthDataProvider(logger, errors));

    logger.enableSeverity('verbose');
    logger.enableCategory('all');

    return (
        <AppContextType.Provider value={{ logger, errors, users }}>
            {children}
        </AppContextType.Provider>
    );
}
