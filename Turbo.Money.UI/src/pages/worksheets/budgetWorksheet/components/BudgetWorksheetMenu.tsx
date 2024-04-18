
import { IMenuData } from "controls/menu/IMenuData";
import Menu from "controls/menu/Menu";

import styleModule from './BudgetWorksheetMenu.module.css';

interface IProps {
    menuData: IMenuData
}

export default function BudgetWorksheetMenu({ menuData }: IProps) {
    return (
        <Menu menuData={menuData} customStyle={styleModule} hover={false} wide={false} />
    );
}

