import React, { useEffect } from 'react'

import AppContext from "./AppContext";
import UserService from './services/user/UserService';

export default function AppContextProvider({ children }) {

    const errors = null;
    const logger = null;
    const users = UserService();

    return (
        <AppContext.Provider value={{ errors, logger, users }}>
            {children}
        </AppContext.Provider>
    );
}
