
import { IMenuData } from "controls/menu/IMenuData";
import Menu from "controls/menu/Menu";

import styleModule from './BankWorksheetMenu.module.css';

interface IProps {
    menuData: IMenuData
}

export default function BankWorksheetMenu({ menuData }: IProps) {
    return (
        <Menu menuData={menuData} customStyle={styleModule} hover={false} wide={false} />
    );
}

