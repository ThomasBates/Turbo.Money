import React from "react";

export default (account) => {

    const amountTypes = {
        "min": "Minimum",
        "fix": "Fixed",
        "max": "Maximum",
        "est": "Estimate",
        "avg": "Average"
    };
    const typeName = account && amountTypes[account.type];

    const amountValue = Number(account.amount);

    const localeFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    const formattedAmount = localeFormat.format(amountValue);

    return {
        name: account.name,
        description: account.description,
        amount: formattedAmount,
        typeName: typeName,
        method: account.method
    }
};
