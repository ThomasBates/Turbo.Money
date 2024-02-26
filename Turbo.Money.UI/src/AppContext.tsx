import  { createContext } from 'react'

const AppContext = createContext({
    user: {
        name: "",
        email: "",
        picture: ""
    },

    signedIn: false,
    checkSignInState: () => { }
});

export default AppContext;