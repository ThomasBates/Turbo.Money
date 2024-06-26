/* eslint-disable @typescript-eslint/no-unused-vars */

import IUserService, { SignInStatus } from './IUserService';

export default function UserDummyService(): IUserService {

    const signUpOAuth = async (_source: string): Promise<void> => { }
    const signInOAuth = async (_source: string): Promise<void> => { }
    const callbackOAuth = async (_params: string): Promise<void> => { }
    const signUpEmail = async (_name: string, _email: string, _password: string): Promise<void> => { }
    const signInEmail = async (_email: string, _password: string): Promise<void> => { }
    const signOut = async (): Promise<void> => { }
    const abort = async (): Promise<void> => { }
    const switchFamily = async (_familyName: string): Promise<void> => { }

    return {
        user: null,
        signInStatus: SignInStatus.Pending,

        switchFamily,

        auth: {
            signUpOAuth,
            signInOAuth,
            callbackOAuth,

            signUpEmail,
            signInEmail,

            signOut,
            abort,
        }
    };
}
