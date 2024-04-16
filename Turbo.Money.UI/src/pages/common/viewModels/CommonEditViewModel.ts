
import ICommonEditViewModel from './ICommonEditViewModel';
import ICommonModeViewModelProps from './ICommonModeViewModelProps';

export default function CommonEditViewModel(
    { title, entity, mode, item, setItem, onSubmitted, onCancelled }: ICommonModeViewModelProps
): ICommonEditViewModel {
    const modeText = mode === "edit" ? `Update` : `Create`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setProperty = (name: string, value: string | string[] | number) => {
        if (setItem && item)
            setItem({ ...item, [name]: value });
    };

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

        canSubmit: true,
        canCancel: true,

        setProperty,
        submit,
        cancel
    }
}
