import { NavigateFunction } from 'react-router-dom';

export default interface ISignInEmailViewModel {
    email: string;
    password: string;

    setEmail: (value: string) => void;
    setPassword: (value: string) => void;

    canSubmit: boolean;
    submit: (navigate: NavigateFunction) => void,
}