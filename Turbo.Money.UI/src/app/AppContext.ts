import  { createContext } from 'react'

import { AppContextType } from './AppContextType';

import LoggerDummyService from 'services/logger/LoggerDummyService';
import ErrorDummyService from 'services/errors/ErrorDummyService';
import UserDummyService from 'services/user/UserDummyService';

const AppContext = createContext<AppContextType>({
    logger: LoggerDummyService(),
    errors: ErrorDummyService(),
    users: UserDummyService(),
});

export default AppContext;
