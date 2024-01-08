import React from "react";

export default (mode, title, item?, onSubmitted?, onCancelled?) => {

    title = mode === "delete" ? `Delete ${title}:` : `${title} Details:`;
    const showDetails = (item && item.id);
    const showButtons = (mode === "delete");

    const submit = () => {
        onSubmitted();
    }

    const cancel = () => {
        onCancelled();
    };

    return {
        mode,
        title,
        item,
        showDetails,
        showButtons,

        submit,
        cancel
    };
};
