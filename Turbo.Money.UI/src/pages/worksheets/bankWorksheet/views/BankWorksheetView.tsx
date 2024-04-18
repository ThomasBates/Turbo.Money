import { useEffect } from "react";

import ICommonStyle from "common/views/ICommonStyle";
import IFactoryViewProps from "common/views/IFactoryViewProps";

import Modal from 'controls/modal/Modal';

import BankAccountDetailsView from "pages/basic/bankAccount/views/BankAccountDetailsView";
import BankAccountEditView from "pages/basic/bankAccount/views/BankAccountEditView";
import BankBankDetailsView from "pages/basic/bankBank/views/BankBankDetailsView";
import BankBankEditView from "pages/basic/bankBank/views/BankBankEditView";

import IBasicModeViewModel from "pages/basic/common/viewModels/IBasicModeViewModel";

import BankWorksheetMenu from '../components/BankWorksheetMenu';

import IBankWorksheetBankViewModel from "../viewModels/IBankWorksheetBankViewModel";
import IBankWorksheetViewModel from "../viewModels/IBankWorksheetViewModel";

import BankWorksheetBankView from "./BankWorksheetBankView";
import IBankWorksheetModeViews from "./IBankWorksheetModeViews";

import basicStyleModule from 'pages/basic/common/views/BasicMainView.module.css';
import styleModule from "./BankWorksheet.module.css";

const modeViews: Record<string, IBankWorksheetModeViews> = {
    BankBank: {
        add: BankBankEditView,
        edit: BankBankEditView,
        show: BankBankDetailsView,
        delete: BankBankDetailsView,
    },
    BankAccount: {
        add: BankAccountEditView,
        edit: BankAccountEditView,
        show: BankAccountDetailsView,
        delete: BankAccountDetailsView,
    }
}

interface IModeViewProps {
    modeViewModel: IBasicModeViewModel;
    style: ICommonStyle;
}

const ModeView = ({ modeViewModel, style }: IModeViewProps) => {
    const SelectedModeView = modeViews[modeViewModel.entity][modeViewModel.mode];
    return (
        <SelectedModeView dataContext={modeViewModel} style={style} />
    );
}

export default function BankWorksheetView({ dataContext }: IFactoryViewProps) {

    const viewModel = dataContext() as IBankWorksheetViewModel;
    const style = styleModule as ICommonStyle;
    const basicStyle = basicStyleModule as ICommonStyle;

    useEffect(() => {
        viewModel.loadBankData();
    }, []);

    const menuData = {
        content: "root",
        tooltip: "Bank Actions",
        list: [
            { action: viewModel.loadBankData, icon: "load_icon", content: "Reload bank data", },
            { action: viewModel.saveBankData, icon: "save_icon", content: "Save bank data",},
            { action: viewModel.addBank, icon: "add_icon", content: "Create new bank", },
        ]
    };

    return (
        <>
            <div>
                <table className={style.table}> 
                    <tbody>
                        <tr>
                            <td colSpan={5} className={style.title}><h1>{viewModel.title}</h1></td>
                        </tr>
                        <tr>
                            <td colSpan={4}></td>
                            <td className={style.buttons}>
                                <BankWorksheetMenu menuData={menuData} />
                            </td>
                        </tr>

                        {viewModel.bankViewModels &&
                            viewModel.bankViewModels.map((viewModel: IBankWorksheetBankViewModel) => (
                                <BankWorksheetBankView
                                    key={viewModel.name}
                                    dataContext={viewModel}
                                    style={style} />
                            ))
                        }

                        <tr>
                            <td colSpan={4}></td>
                            <td className={style.buttons}>
                                <BankWorksheetMenu menuData={menuData} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {viewModel.modeViewModel &&
                <Modal className={style.modal_theme}>
                    <ModeView modeViewModel={viewModel.modeViewModel} style={basicStyle} />
                </Modal>
            }
        </>
    );
}
