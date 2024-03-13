import axios from "../../axios/AxiosCommon";

export default function AuthDataProvider() {

    // Gets 3rd party authentication url from backend server
    const getSignInUrl = async (source, mode) => {
        console.log(`AuthDataProvider.getSignInUrl('${source}', '${mode}')`);

        try {
            const response = await axios.get(`user/sign_in_url`, {
                params: {
                    source: source,
                    mode: mode,
                }
            });
            console.log(`AuthDataProvider.getSignInUrl('${source}', '${mode}') return`, response.data);
            return response.data;

        } catch (error) {
            console.error('AuthDataProvider.getSignInUrl: error =', error);
            return { error };
        }
    }

    // Gets whether user is already signed in using browser cookie
    const getSignedIn = async () => {
        console.log('AuthDataProvider.getSignedIn()');

        try {

            const response = await axios.get(`user/signed_in`);
            console.log('AuthDataProvider.getSignedIn() return', response.data);
            return response.data;

        } catch (error) {
            console.error('AuthDataProvider.getSignedIn: error =', error);
            return { error };
        }
    }

    // Sends code from 3rd party authorization to backend server
    const signIn = async (params) => {
        console.log('AuthDataProvider.signIn(...) params =', params);

        try {
            const response = (typeof params === 'string')
                ? await axios.post(`user/sign_in${params}`)
                : await axios.post('user/sign_in', {}, { params: params });
            console.log('AuthDataProvider.signIn(...) return', response.data);
            return response.data;

        } catch (error) {
            console.error('AuthDataProvider.signIn: error =', error);
            return { error };
        }
    }

    // clears browser cookie
    const signOut = async () => {
        console.log('AuthDataProvider.signOut()');

        try {

            const response = await axios.post(`user/sign_out`);
            console.log('AuthDataProvider.signOut() return', response.data);
            return response.data;

        } catch (error) {
            console.error('AuthDataProvider.signOut: error =', error);
            return { error };
        }
    }

    return {
        getSignInUrl,
        getSignedIn,
        signIn,
        signOut,
    };
}