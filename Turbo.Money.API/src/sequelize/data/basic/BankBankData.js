
module.exports = function BankBankData(logger, errors, table) {
    const module = BankBankData.name;

    const encode = (bank) => {
        const context = `${module}.${encode.name}`;

        if (!bank)
            return errors.create(context, 'InvalidArgument', 'bank is not defined');

        const data = {
            //id: bank.id,
            name: bank.name,
            description: bank.description,
            number: bank.number,
            branch: bank.branch,
        };
        return data;
    }

    const decode = (userCookie, data) => {
        const context = `${module}.${decode.name}`;

        if (!data)
            return errors.create(context, 'InvalidArgument', 'data is not defined');

        if (data.UserFamilyId !== userCookie.familyId)
            return errors.create(context, 'SecurityBreach', `data's family (${data.UserFamilyId}) is not user's family (${userCookie.familyId}).`);

        const bank = {
            id: data.id,
            name: data.name,
            description: data.description,
            number: data.number,
            branch: data.branch,
        };
        return bank;
    }

    const decodeList = (userCookie, data) => {
        const context = `${module}.${decodeList.name}`;

        if (!data)
            return errors.create(context, 'InvalidArgument', 'data is not defined');

        let error;
        const banks = data.map(item => {
            if (error)
                return error;

            if (item.UserFamilyId !== userCookie.familyId) {
                error = errors.create(context, 'SecurityBreach', `item's family (${data.UserFamilyId}) is not user's family (${userCookie.familyId}).`);
                return error;
            }

            return { id: item.id, name: item.name }
        });

        if (error)
            return error;
        
        return { list: banks };
    }

    const validate = (bank) => {
        const context = `${module}.${validate.name}`;

        if (!bank.name)
            return errors.create(context, 'InvalidData', "Bank name can not be empty!");

        if (!bank.number)
            return errors.create(context, 'InvalidData', "Bank number can not be empty!");

        //if (!bank.branch)
        //    return errors.create(context, 'InvalidData', "Bank branch can not be empty!");

        return {}
    }

    return require('./CommonData')(
        logger, errors, "BankBank", table,
        encode, decode, decodeList, validate);
}