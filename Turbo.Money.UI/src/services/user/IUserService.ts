
import IUserInfo from 'models/user/IUserInfo';

export enum SignInStatus {
    Pending,
    SignedIn,
    SignedOut,
}

export default interface IUserService {
    user: IUserInfo | null,
    signInStatus: SignInStatus,

    switchFamily(familyName: string): Promise<void>;

    auth: {
        signUpOAuth(source: string): Promise<void>;
        signInOAuth(source: string): Promise<void>;
        callbackOAuth(params: string): Promise<void>;
        signUpEmail(name: string, email: string, password: string): Promise<void>;
        signInEmail(email: string, password: string): Promise<void>;
        signOut(): Promise<void>;
        abort(): Promise<void>;
    }
}
