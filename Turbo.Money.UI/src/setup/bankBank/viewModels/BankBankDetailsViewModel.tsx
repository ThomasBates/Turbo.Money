
import CommonDetailsViewModel from "../../common/viewModels/CommonDetailsViewModel";

export default function BankDetailsViewModel({ mode, item, onSubmitted, onCancelled }) {

    return CommonDetailsViewModel(
        "Bank",
        "Bank",
        mode,
        item,
        onSubmitted,
        onCancelled);
};
