
module.exports = function BankBankController(logger, errors, business) {
    const module = 'BankBankController';
    const category = 'BankBank';

    const decode = (data) => {
        const context = `${module}.${decode.name}`;

        if (!data)
            return errors.create(context, 'ParseError', "data is not defined.");

        if (!data.name)
            return errors.create(context, 'ParseError', "data.name is not defined.");

        if (!data.number)
            return errors.create(context, 'ParseError', "data.number is not defined.");

        //if (!data.branch)
        //    return errors.create(context, 'ParseError', "data.branch is not defined.");

        const bank = {
            id: data.id,
            name: data.name,
            description: data.description,
            number: data.number,
            branch: data.branch,
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

    return require("./CommonController")(
        logger, errors, category, business,
        decode, encode, encodeList);
}
