
import ICommonDetailsViewModel from './ICommonDetailsViewModel';
import ICommonModeViewModelProps from './ICommonModeViewModelProps';

export default function CommonDetailsViewModel(
    { title, entity, mode, item, onSubmitted, onCancelled }: ICommonModeViewModelProps
): ICommonDetailsViewModel {
    const modeText = mode === "show" ? `Show` : `Delete`;

    const notSelected = `No ${title} selected`
    const showDetails = !!(item && item.id);
    const showButtons = (mode === "delete");
    const showOKButton = (mode === "show");

    const submit = () => {
        if (onSubmitted && item)
            onSubmitted(item);
    }

    const cancel = () => {
        if (onCancelled && item)
            onCancelled(item);
    };

    return {
        title,
        entity,
        mode,
        modeText,
        item,

        notSelected,
        showDetails,
        showButtons,
        showOKButton,

        canSubmit: true,
        canCancel: true,

        submit,
        cancel
    };
}
