
module.exports = function BankBankData(logger, table) {

    const encode = (bank) => {
        const data = {
            //id: bank.id,
            name: bank.name,
            number: bank.number,
            transit: bank.transit
        };
        return data;
    }

    const decode = (userCookie, data) => {
        if (!data)
            return { error: "decode: data is not defined" };

        if (data.UserFamilyId !== userCookie.familyId)
            return { error: `decode: This data belongs to a family (${data.UserFamilyId}) that is different from the user's family (${userCookie.familyId}).` };

        const bank = {
            id: data.id,
            name: data.name,
            number: data.number,
            transit: data.transit
        };
        return bank;
    }

    const decodeList = (userCookie, data) => {
        if (!data)
            return { error: "decodeList: data is not defined" };

        const banks = data.map(item => {
            if (item.UserFamilyId !== userCookie.familyId)
                return { error: `decodeList: This data item belongs to a family (${item.UserFamilyId}) that is different from the user's family (${userCookie.familyId}).` };

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

    return require('./CommonData')(logger, "BankBank", table, encode, decode, decodeList, validate);
}