
import Menu from "components/menu/Menu";

import style from './BudgetWorksheetMenu.module.css';

const icons = {
    load: (<img src="/assets/icons/worksheet/load.png" alt="load" width="24" />),
    save: (<img src="/assets/icons/worksheet/save.png" alt="save" width="24" />),
    add: (<img src="/assets/icons/worksheet/add.png" alt="add" width="16" />),
    edit: (<img src="/assets/icons/worksheet/edit.png" alt="edit" width="16" />),
    show: (<img src="/assets/icons/worksheet/show.png" alt="show" width="16" />),
    delete: (<img src="/assets/icons/worksheet/delete.png" alt="delete" width="16" />),
};

export default function BudgetWorksheetMenu({ menuData }) {

    const newData = {
        content: menuData.content,
        list: menuData.list.map(item => ({
            action: item.action,
            content: item.content,
            icon: icons[item.icon],
        }))
    };

    return (
        <Menu menuData={newData} style={style} hover={false} wide={false} />
    );
}

