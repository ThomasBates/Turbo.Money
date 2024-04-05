
import CommonDetailsViewModel from "../../common/viewModels/CommonDetailsViewModel";

export default function BudgetSectionDetailsViewModel({ mode, item, onSubmitted, onCancelled }) {

    return CommonDetailsViewModel(
        "Budget Section",
        "BudgetSection",
        mode,
        item,
        onSubmitted,
        onCancelled);
};
