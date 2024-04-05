
export default function PublicNavData() {

    const initialNavData = {
        content: "root",
        minWidth: "20em",
        list: [
            {
                content: (<img src="/assets/images/logo.png" alt="It's My Money" width="200" />),
                to: "/",
            },
            { content: "Home", to: "/", },
            { content: "About", to: "/about" }
        ]
    };

    return initialNavData;
}
