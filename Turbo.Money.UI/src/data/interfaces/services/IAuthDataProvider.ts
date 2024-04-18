
import IUserInfo from 'models/user/IUserInfo';

import { IErrorInfo } from 'services/errors/IErrorService';

export interface ISignInUrlResult {
    url: string;
}

export interface ISignInResult {
    message: string;
    signedIn: boolean;
    user: IUserInfo;
}

export default interface IAuthDataProvider {
    getSignInUrl(source: string, mode: string): Promise<ISignInUrlResult | IErrorInfo>;
    getSignedIn(): Promise<ISignInResult | IErrorInfo>;
    signIn(params: string | object): Promise<ISignInResult | IErrorInfo>;
    signOut(): Promise<ISignInResult | IErrorInfo>;
    abort(): Promise<ISignInResult | IErrorInfo>;
    switchFamily(familyName: string): Promise<ISignInResult | IErrorInfo>;
}
