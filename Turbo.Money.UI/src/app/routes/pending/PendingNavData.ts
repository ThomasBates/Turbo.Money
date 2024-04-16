import { IMenuData } from "src/controls/menu/IMenuData";

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
        ]
    };

    return initialNavData;
}
