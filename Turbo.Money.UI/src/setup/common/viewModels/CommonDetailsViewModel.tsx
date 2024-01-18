import React from "react";

export default (title, entity, mode, item, onSubmitted, onCancelled) => {

    title = mode === "delete" ? `Delete ${title}:` : `${title} Details:`;
    const showDetails = (item && item.id);
    const showButtons = (mode === "delete");
    const showOKButton = (mode === "show");

    const submit = () => {
        onSubmitted(item);
    }

    const cancel = () => {
        onCancelled(item);
    };

    return {
        title,
        entity,
        mode,
        item,
        showDetails,
        showButtons,
        showOKButton,

        submit,
        cancel
    };
};
