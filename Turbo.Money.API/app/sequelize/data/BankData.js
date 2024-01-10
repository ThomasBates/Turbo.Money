
module.exports = (table) => {

    const encode = (bank) => {
        const data = {
            id: bank.id,
            name: bank.name,
            number: bank.number,
            transit: bank.transit
        };
        return [null, data];
    }

    const decode = (data) => {
        const bank = {
            id: data.id,
            name: data.name,
            number: data.number,
            transit: data.transit
        };
        return [null, bank];
    }

    const decodeList = (data) => {

        const banks = data.map(item => {
            return { id: item.id, name: item.name }
        });
        
        return [null, banks];
    }

    const validate = (bank) => {
        if (!bank.name || !bank.number || !bank.transit) {
            return "Content can not be empty!";
        }
        return null
    }

    return require('./CommonData')("BankData", table, encode, decode, decodeList, validate);
}