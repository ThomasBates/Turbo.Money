
module.exports = (logger, table) => {

    const encode = (bank) => {
        const data = {
            //id: bank.id,
            name: bank.name,
            number: bank.number,
            transit: bank.transit
        };
        return data;
    }

    const decode = (data) => {
        const bank = {
            id: data.id,
            name: data.name,
            number: data.number,
            transit: data.transit
        };
        return bank;
    }

    const decodeList = (data) => {

        const banks = data.map(item => {
            return { id: item.id, name: item.name }
        });
        
        return { list: banks };
    }

    const validate = (bank) => {
        if (!bank.name) {
            return "Bank name can not be empty!";
        }
        if (!bank.number) {
            return "Bank number can not be empty!";
        }
        if (!bank.transit) {
            return "Bank transit can not be empty!";
        }
        return null
    }

    return require('./CommonData')(logger, "BankData", table, encode, decode, decodeList, validate);
}