import { NavigateFunction } from 'react-router-dom';

export default interface ISignUpEmailViewModel {
    name: string;
    email: string;
    password: string;

    setName: (value: string) => void;
    setEmail: (value: string) => void;
    setPassword: (value: string) => void;

    canSubmit: boolean;
    submit: (navigate: NavigateFunction) => void,
}