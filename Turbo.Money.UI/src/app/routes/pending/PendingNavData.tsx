
export default function PublicNavData() {

    const initialNavData = {
        content: "root",
        minWidth: "20em",
        list: [
            {
                content: (<img src="/src/assets/images/logo.png" alt="It's My Money" width="200" />),
                to: "/",
            },
        ]
    };

    return initialNavData;
}
