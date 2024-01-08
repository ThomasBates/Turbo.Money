
module.exports = (business) => {

    const decode = async (data) => {
        if (!data)
            return ["parse error: data is not defined.", null];
        if (!data.name)
            return ["parse error: data.name is not defined.", null];
        if (!data.number)
            return ["parse error: data.number is not defined.", null];
        if (!data.transit)
            return ["parse error: data.transit is not defined.", null];

        const bank = {
            id: data.id,
            name: data.name,
            number: data.number,
            transit: data.transit
        };

        return [null, bank];
    }

    const encode = async (bank) => {
        return [null, bank];
    }

    const encodeList = async (bankList) => {
        let dataList = bankList.map(bank => {
            return { id: bank.id, name: bank.name }
        });
        return [null, dataList];
    }

    return require("./CommonController")("BankController", business, decode, encode, encodeList);
}
