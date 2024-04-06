/* eslint-disable @typescript-eslint/no-explicit-any */

import UserInfo from 'models/UserInfo';

export enum SignInStatus {
    Pending,
    SignedIn,
    SignedOut,
}

export default interface IUserService {
    user: UserInfo | null,
    signInStatus: SignInStatus,

    switchFamily(familyName: string): any;

    auth: {
        signUpOAuth(source: string): Promise<void>;
        signInOAuth(source: string): Promise<void>;
        callbackOAuth(params: any): Promise<void>;
        signUpEmail(name: string, email: string, password: string): Promise<void>;
        signInEmail(email: string, password: string): Promise<void>;
        signOut(): Promise<void>;
    }
}
