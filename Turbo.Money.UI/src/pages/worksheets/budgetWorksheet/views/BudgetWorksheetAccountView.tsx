
import IStyledViewProps from "common/views/IStyledViewProps";

import BudgetWorksheetMenu from '../components/BudgetWorksheetMenu';

import IBudgetWorksheetAccountViewModel from '../viewModels/IBudgetWorksheetAccountViewModel';

export default function BudgetWorksheetAccountView({ style, dataContext }: IStyledViewProps) {

    const viewModel = dataContext as IBudgetWorksheetAccountViewModel;

    const menuData = {
        content: "root",
        tooltip: "Budget Account Actions",
        list: [
            { action: viewModel.showAccount, icon: "show_icon", content: "Show details of this budget account", },
            { action: viewModel.editAccount, icon: "edit_icon", content: "Edit this budget account", },
            { action: viewModel.deleteAccount, icon: "delete_icon", content: "Delete this budget account", },
        ]
    };

    return (
        <>
            <tr className={style.row}>
                <td></td>
                <td></td>
                <td className={style.account_text}>{viewModel.name}</td>
                <td className={style.account_currency}>{viewModel.amount}</td>
                <td className={style.account_text}>{viewModel.typeName}</td>
                <td className={style.buttons}>
                    <BudgetWorksheetMenu menuData={menuData} />
                </td>
            </tr>
        </>
    );
}
