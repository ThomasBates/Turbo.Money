
import { IMenuData } from "src/controls/menu/IMenuData";
import IUserService from 'services/user/IUserService';

export default function PublicHeaderData(users: IUserService): IMenuData {

    const initialHeaderData = {
        content: "root",
        minWidth: "20em",
        list: [
            {
                content: "Pending",
            },
            {
                content: "Abort",
                action: users.auth.abort
            }
        ]
    };

    return initialHeaderData;
}
