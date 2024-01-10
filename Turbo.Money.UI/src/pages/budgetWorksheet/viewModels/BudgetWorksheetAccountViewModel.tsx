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

    return {
        name: account.name,
        description: account.description,
        amount: account.amount,
        typeName: typeName,
        method: account.method
    }
};
