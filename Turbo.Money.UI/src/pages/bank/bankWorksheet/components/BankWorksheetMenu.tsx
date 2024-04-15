
import Menu from "components/menu/Menu";

import bankWorksheetMenuStyle from './BankWorksheetMenu.module.css';
import { IMenuData } from "components/menu/IMenuData";

interface IProps {
    menuData: IMenuData
}

export default function BankWorksheetMenu({ menuData }: IProps) {
    return (
        <Menu menuData={menuData} customStyle={bankWorksheetMenuStyle} hover={false} wide={false} />
    );
}

