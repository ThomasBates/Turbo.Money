
import ICommonEditViewModel from './ICommonEditViewModel';
import ICommonModeViewModelProps from './ICommonModeViewModelProps';

export default function CommonEditViewModel(
    { title, entity, mode, item, setItem, onSubmitted, onCancelled }: ICommonModeViewModelProps
): ICommonEditViewModel {
    title = mode === "edit" ? `Edit ${title}:` : `Add ${title}:`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setProperty = (name: string, value: any) => {
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
        item,

        canSubmit: true,
        canCancel: true,

        setProperty,
        submit,
        cancel
    }
}
