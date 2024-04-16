
import Menu from "src/controls/menu/Menu";

import bankWorksheetMenuStyle from './BankWorksheetMenu.module.css';
import { IMenuData } from "src/controls/menu/IMenuData";

interface IProps {
    menuData: IMenuData
}

export default function BankWorksheetMenu({ menuData }: IProps) {
    return (
        <Menu menuData={menuData} customStyle={bankWorksheetMenuStyle} hover={false} wide={false} />
    );
}

