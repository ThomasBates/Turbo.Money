
import CommonEditViewModel from "../../common/viewModels/CommonEditViewModel";

export default function BankEditViewModel({ mode, item, setItem, list, onSubmitted, onCancelled }) {

    const common = CommonEditViewModel(
        "Bank",
        "Bank",
        mode,
        item,
        setItem,
        onSubmitted,
        onCancelled);

    const getIsValidName = () => {
        if (!item.name || item.name.length == 0)
            return false;
        const matching = list.find(b => b.name.toUpperCase() == item.name.toUpperCase() && b.id != item.id);
        if (matching)
            return false;
        return true;
    }

    const getIsValidNumber = () => {
        if (!item.number || item.number.length != 3)
            return false;
        if (isNaN(+item.number))
            return false;
        const matching = list.find(b => b.number == item.number && b.transit == item.transit && b.id != item.id);
        if (matching)
            return false;
        return true;
    }

    const getIsValidTransit = () => {
        if (!item.transit || item.transit.length != 5)
            return false;
        if (isNaN(+item.transit))
            return false;
        const matching = list.find(b => b.number == item.number && b.transit == item.transit && b.id != item.id);
        if (matching)
            return false;
        return true;
    }

    const isValidName = getIsValidName();
    const isValidNumber = getIsValidNumber();
    const isValidTransit = getIsValidTransit();
    const canSubmit = isValidName && isValidNumber && isValidTransit;

    return {
        ...common,

        isValidName,
        isValidNumber,
        isValidTransit,
        canSubmit
    }
};
