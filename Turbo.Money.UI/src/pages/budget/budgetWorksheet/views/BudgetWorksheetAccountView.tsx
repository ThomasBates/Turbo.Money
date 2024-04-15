
import IViewProps from 'pages/common/views/IViewProps';

import BudgetWorksheetMenu from '../components/BudgetWorksheetMenu';
import IBudgetWorksheetAccountViewModel from '../viewModels/IBudgetWorksheetAccountViewModel';

export default function BudgetWorksheetAccountView({ dataContext }: IViewProps) {

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
            <tr className="tb-worksheet-row">
                <td></td>
                <td></td>
                <td className="tb-worksheet-account-text">{viewModel.name}</td>
                <td className="tb-worksheet-account-currency">{viewModel.amount}</td>
                <td className="tb-worksheet-account-text">{viewModel.typeName}</td>
                <td className="tb-worksheet-buttons">
                    <BudgetWorksheetMenu menuData={menuData} />
                </td>
            </tr>
        </>
    );
}
