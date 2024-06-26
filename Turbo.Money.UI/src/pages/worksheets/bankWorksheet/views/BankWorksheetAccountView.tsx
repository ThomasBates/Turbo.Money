
import IStyledViewProps from "common/views/IStyledViewProps";

import BankWorksheetMenu from '../components/BankWorksheetMenu';

import IBankWorksheetAccountViewModel from '../viewModels/IBankWorksheetAccountViewModel';

export default function BankWorksheetAccountView({ style, dataContext }: IStyledViewProps) {

    const viewModel = dataContext as IBankWorksheetAccountViewModel;

    const menuData = {
        content: "root",
        tooltip: "Bank Account Actions",
        list: [
            { action: viewModel.showAccount, icon: "show_icon", content: "Show details of this bank account", },
            { action: viewModel.editAccount, icon: "edit_icon", content: "Edit this bank account", },
            { action: viewModel.deleteAccount, icon: "delete_icon", content: "Delete this bank account", },
        ]
    };

    return (
        <>
            <tr className={style.row}>
                <td></td>
                <td className={style.account_text}>{viewModel.name}</td>
                <td className={style.account_text}>{viewModel.number}</td>
                <td className={style.account_text}>{viewModel.description}</td>
                <td className={style.buttons}>
                    <BankWorksheetMenu menuData={menuData} />
                </td>
            </tr>
        </>
    );
}
