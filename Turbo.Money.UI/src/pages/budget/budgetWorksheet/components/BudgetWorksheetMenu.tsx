
import Menu from "src/controls/menu/Menu";

import budgetWorksheetStyle from './BudgetWorksheetMenu.module.css';
import { IMenuData } from "src/controls/menu/IMenuData";

interface IProps {
    menuData: IMenuData
}

export default function BudgetWorksheetMenu({ menuData }: IProps) {
    return (
        <Menu menuData={menuData} customStyle={budgetWorksheetStyle} hover={false} wide={false} />
    );
}

