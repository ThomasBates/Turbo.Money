/* eslint-disable @typescript-eslint/no-explicit-any */

import { ErrorInfo } from 'services/errors/IErrorService';
import UserInfo from 'models/UserInfo';

export interface SignInUrlResult {
    url: string;
}

export interface SignInResult {
    message: string;
    signedIn: boolean;
    user: UserInfo;
}

export default interface IAuthDataProvider {
    getSignInUrl: (source: string, mode: string) => Promise<SignInUrlResult | ErrorInfo>;
    getSignedIn: () => Promise<SignInResult | ErrorInfo>;
    signIn: (params: any) => Promise<SignInResult | ErrorInfo>;
    signOut: () => Promise<SignInResult | ErrorInfo>;
}
