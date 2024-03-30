import axios from "../../axios/AxiosCommon";

export default function AuthDataProvider() {
    const module = AuthDataProvider.name;

    // Gets 3rd party authentication url from backend server
    const getSignInUrl = async (source, mode) => {
        const context = `${module}.${getSignInUrl.name}:`;
        console.log(context, `('${source}', '${mode}')`);

        try {
            const response = await axios.get(`user/sign_in_url`, {
                params: {
                    source: source,
                    mode: mode,
                }
            });
            console.log(context, 'return', response.data);
            return response.data;

        } catch (error) {
            console.error(context, 'catch: error =', error);
            return { error };
        }
    }

    // Gets whether user is already signed in using browser cookie
    const getSignedIn = async () => {
        const context = `${module}.${getSignedIn.name}:`;
        console.log(context, '()');

        try {

            const response = await axios.get(`user/signed_in`);
            console.log(context, 'return', response.data);
            return response.data;

        } catch (error) {
            console.error(context, 'error =', error);
            return { error };
        }
    }

    // Sends code from 3rd party authorization to backend server
    const signIn = async (params) => {
        const context = `${module}.${signIn.name}:`;
        console.log(context, 'params =', params);

        try {
            const response = (typeof params === 'string')
                ? await axios.post(`user/sign_in${params}`)
                : await axios.post('user/sign_in', {}, { params: params });
            console.log(context, 'return', response.data);
            return response.data;

        } catch (error) {
            console.error(context, 'error =', error);
            return { error };
        }
    }

    // clears browser cookie
    const signOut = async () => {
        const context = `${module}.${signOut.name}:`;
        console.log(context, '()');

        try {

            const response = await axios.post(`user/sign_out`);
            console.log(context, 'return', response.data);
            return response.data;

        } catch (error) {
            console.error(context, 'error =', error);
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
