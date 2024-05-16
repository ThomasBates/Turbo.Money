import { useNavigate } from 'react-router-dom';

import IFactoryViewProps from 'common/views/IFactoryViewProps';

import ISignInEmailViewModel from '../viewModels/ISignInEmailViewModel';

import './Auth.css';

export default function SignInEmailView({ dataContext }: IFactoryViewProps) {
    const navigate = useNavigate();

    const viewModel = dataContext() as ISignInEmailViewModel;

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await viewModel.submit(navigate)
    }

    return (
        <div className="login-wrapper">
            <h1 className='tb-page-title'>Sign In with Email</h1>
            <form className='tb-form' onSubmit={handleSubmit}>

                <label className='tb-form-label'> Email </label>
                <input
                    type="text"
                    className='tb-form-input'
                    onChange={e => viewModel.setEmail(e.target.value)} />

                <label className='tb-form-label'> Password </label>
                <input
                    type="password"
                    className='tb-form-input'
                    onChange={e => viewModel.setPassword(e.target.value)} />

                <div>
                    <button type="submit" className='tb-button'>Sign In</button>
                </div>
            </form>
        </div>
    )
}
