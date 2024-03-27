
module.exports = function BankBankController(logger, business) {

    const decode = (data) => {
        if (!data)
            return { error: "parse error: data is not defined." };
        if (!data.name)
            return { error: "parse error: data.name is not defined." };
        if (!data.number)
            return { error: "parse error: data.number is not defined." };
        if (!data.transit)
            return { error: "parse error: data.transit is not defined." };

        const bank = {
            id: data.id,
            name: data.name,
            number: data.number,
            transit: data.transit
        };

        return bank;
    }

    const encode = (bank) => {
        return bank;
    }

    const encodeList = (bankList) => {
        let dataList = bankList.map(bank => {
            return { id: bank.id, name: bank.name }
        });
        return { list: dataList };
    }

    return require("./CommonController")(logger, "BankBank", business, decode, encode, encodeList);
}
