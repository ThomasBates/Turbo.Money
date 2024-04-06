
import ILoggerService from 'services/logger/ILoggerService';
import IErrorService from 'services/errors/IErrorService';
import IUserService from 'services/user/IUserService';

export type AppContextType = {
    logger: ILoggerService
    errors: IErrorService
    users: IUserService
}
