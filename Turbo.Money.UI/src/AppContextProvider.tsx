import React, { useEffect } from 'react'

import AppContext from "./AppContext";

import AuthDataProvider from './auth/data/AuthDataProvider';
import UserService from './services/user/UserService';

import LoggerConsoleProvider from './services/logger/LoggerConsoleProvider';
import Logger from './services/logger/Logger';

import Errors from './services/errors/Errors';

export default function AppContextProvider({ children }) {

    const logger = Logger(LoggerConsoleProvider());
    const errors = Errors(logger);
    const users = UserService(logger, errors, AuthDataProvider(logger, errors));

    logger.enableSeverity('verbose');
    logger.enableCategory('all');

    return (
        <AppContext.Provider value={{ logger, errors, users }}>
            {children}
        </AppContext.Provider>
    );
}
