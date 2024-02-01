import React, { useEffect, useState } from "react";

import BudgetWorksheetMenu from "../components/BudgetWorksheetMenuDropdown";
import BudgetWorksheetMenuItem from "../components/BudgetWorksheetMenuDropdownItem";

function Menu({ viewModel }) {
    return (
        <BudgetWorksheetMenu tooltip="Budget Account Actions" >
            <BudgetWorksheetMenuItem
                icon="show"
                text="Show details of this budget account"
                onClick={viewModel.showAccount} />
            <BudgetWorksheetMenuItem
                icon="edit"
                text="Edit this budget account"
                onClick={viewModel.editAccount} />
            <BudgetWorksheetMenuItem
                icon="delete"
                text="Delete this budget account"
                onClick={viewModel.deleteAccount} />
        </BudgetWorksheetMenu>
    );
};

const BudgetWorksheetAccountView = ({ viewModel }) => {
    return (
        <>
            <tr className="tb-worksheet-row">
                <td></td>
                <td></td>
                <td className="tb-worksheet-account-text">{viewModel.name}</td>
                <td className="tb-worksheet-account-currency">{viewModel.amount}</td>
                <td className="tb-worksheet-account-text">{viewModel.typeName}</td>
                <td className="tb-worksheet-buttons">
                    <Menu viewModel={viewModel} />
                </td>
            </tr>
        </>
    );
};

export default BudgetWorksheetAccountView;