
import BudgetWorksheetMenu from '../components/BudgetWorksheetMenu';

export default function BudgetWorksheetAccountView({ viewModel }) {

    const menuData = {
        content: "root",
        tooltip: "Budget Account Actions",
        list: [
            { action: viewModel.showAccount, content: "Show details of this budget account", icon: "show", },
            { action: viewModel.editAccount, content: "Edit this budget account", icon: "edit", },
            { action: viewModel.deleteAccount, content: "Delete this budget account", icon: "delete", },
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
};
