import { IMenuData } from "components/menu/IMenuData";

export default function PublicNavData(): IMenuData {

    const initialNavData = {
        content: "root",
        minWidth: "20em",
        list: [
            {
                content: "",
                icon: "tb_logo",
                to: "/",
            },
            { content: "Home", to: "/", },
            { content: "About", to: "/about" }
        ]
    };

    return initialNavData;
}
