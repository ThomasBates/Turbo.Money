import axios from "../../../axios/AxiosCommon";

export default function PublicDataProvider() {
    const module = PublicDataProvider.name;

    const getPosts = async () => {
        const context = `${module}.${getPosts.name}:`;
        console.log(context);

        try {
            const response = await axios.get(`posts`)
            console.log(context, 'response.data =', response.data);
            return response.data.posts;

        } catch (error) {
            console.error(context, 'error =', error);
            return { error };
        }
    }

    return {
        getPosts,
    };
}
