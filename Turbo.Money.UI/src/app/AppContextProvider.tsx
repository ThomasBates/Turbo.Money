import { ReactNode } from "react";

import AppContext from "./AppContext";

import LoggerConsoleProvider from 'services/logger/LoggerConsoleProvider';
import ILoggerService from 'services/logger/ILoggerService';
import LoggerService from 'services/logger/LoggerService';

import IErrorService from 'services/errors/IErrorService';
import ErrorService from 'services/errors/ErrorService';

import AuthDataProvider from 'data/axios/services/AuthDataProvider';
import IUserService from 'services/user/IUserService';
import UserService from 'services/user/UserService';

interface IProps {
    children: ReactNode;
}

export default function AppContextProvider({ children }: IProps) {

    const logger: ILoggerService = LoggerService(LoggerConsoleProvider());
    const errors: IErrorService = ErrorService(logger);
    const users: IUserService = UserService(logger, errors, AuthDataProvider(logger, errors));

    logger.enableSeverity('verbose');
    logger.enableCategory('all');

    return (
        <AppContext.Provider value={{ logger, errors, users }}>
            {children}
        </AppContext.Provider>
    );
}
