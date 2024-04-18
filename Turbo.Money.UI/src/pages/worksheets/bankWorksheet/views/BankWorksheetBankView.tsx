
import IStyledViewProps from "common/views/IStyledViewProps";

import BankWorksheetMenu from '../components/BankWorksheetMenu';

import IBankWorksheetAccountViewModel from "../viewModels/IBankWorksheetAccountViewModel";
import IBankWorksheetBankViewModel from "../viewModels/IBankWorksheetBankViewModel";

import BankWorksheetAccountView from "./BankWorksheetAccountView";

export default function BankWorksheetBankView({ dataContext, style }: IStyledViewProps) {

    const viewModel = dataContext as IBankWorksheetBankViewModel;

    const menuData = {
        content: "root",
        tooltip: "Bank Actions",
        list: [
            { action: viewModel.showBank, icon: "show_icon", content: "Show details of this bank", },
            { action: viewModel.editBank, icon: "edit_icon", content: "Edit this bank", },
            { action: viewModel.addAccount, icon: "add_icon", content: "Create new bank account", },
            { action: viewModel.deleteBank, icon: "delete_icon", content: "Delete this bank", },
        ]
    };

    return (
        <>
            <tr className={style.row}>
                <td colSpan={2} className={style.bank_text}>{viewModel.name}</td>
                <td className={style.bank_text}>{viewModel.number}</td>
                <td className={style.bank_text}>{viewModel.description}</td>
                <td className={style.buttons}>
                    <BankWorksheetMenu menuData={menuData} />
                </td>
            </tr>

            {viewModel.accountViewModels.map((viewModel: IBankWorksheetAccountViewModel) => (
                <BankWorksheetAccountView
                    key={viewModel.name}
                    dataContext={viewModel}
                    style={style} />
            ))}

            <tr className={style.row}>
                <td colSpan={4}></td >
                <td className={style.buttons}>
                    <BankWorksheetMenu menuData={menuData} />
                </td>
            </tr >
        </>
    );
}
