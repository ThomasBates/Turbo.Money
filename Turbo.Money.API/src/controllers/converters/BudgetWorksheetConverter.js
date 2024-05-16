
module.exports = function BudgetWorksheetConverter(errors) {
    const module = BudgetWorksheetConverter.name;

    const periodConverter = require("./BudgetPeriodConverter")(errors);
    const sectionConverter = require("./BudgetSectionConverter")(errors);
    const categoryConverter = require("./BudgetCategoryConverter")(errors);
    const accountConverter = require("./BudgetAccountConverter")(errors);
    const helper = require("./ConverterHelper")(errors);

    const validate = (data) => {
        const context = `${module}.${validate.name}`;

        if (!data.period)
            return errors.create(context, 'ParseError', "data.period is not defined.");

        if (!data.sectionList)
            return errors.create(context, 'ParseError', "data.sectionList is not defined.");

        if (!data.categoryList)
            return errors.create(context, 'ParseError', "data.categoryList is not defined.");

        if (!data.accountList)
            return errors.create(context, 'ParseError', "data.accountList is not defined.");

        return {};
    }

    const decode = (data) => {
        const context = `${module}.${decode.name}`;

        const decodedPeriod = helper.decodeObject(data.period, periodConverter.validate, periodConverter.decode);
        if (decodedPeriod.error)
            return errors.create(context, decodedPeriod.error.code, decodedPeriod);

        const decodedSectionList = helper.decodeList(data.sectionList, sectionConverter.validate, sectionConverter.decode);
        if (decodedSectionList.error)
            return errors.create(context, decodedSectionList.error.code, decodedSectionList);

        const decodedCategoryList = helper.decodeList(data.categoryList, categoryConverter.validate, categoryConverter.decode);
        if (decodedCategoryList.error)
            return errors.create(context, decodedCategoryList.error.code, decodedCategoryList);

        const decodedAccountList = helper.decodeList(data.accountList, accountConverter.validate, accountConverter.decode);
        if (decodedAccountList.error)
            return errors.create(context, decodedAccountList.error.code, decodedAccountList);

        return {
            period: decodedPeriod,
            sectionList: decodedSectionList,
            categoryList: decodedCategoryList,
            accountList: decodedAccountList,

        };
    }

    const encode = (worksheet) => {
        const context = `${module}.${encode.name}`;

        const encodedPeriod = helper.encodeObject(worksheet.period, periodConverter.encode);
        if (encodedPeriod.error)
            return errors.create(context, encodedPeriod.error.code, encodedPeriod);

        const encodedSectionList = helper.encodeList(worksheet.sectionList, sectionConverter.encode);
        if (encodedSectionList.error)
            return errors.create(context, encodedSectionList.error.code, encodedSectionList);

        const encodedCategoryList = helper.encodeList(worksheet.categoryList, categoryConverter.encode);
        if (encodedCategoryList.error)
            return errors.create(context, encodedCategoryList.error.code, encodedCategoryList);

        const encodedAccountList = helper.encodeList(worksheet.accountList, accountConverter.encode);
        if (encodedAccountList.error)
            return errors.create(context, encodedAccountList.error.code, encodedAccountList);

        return {
            period: encodedPeriod,
            sectionList: encodedSectionList,
            categoryList: encodedCategoryList,
            accountList: encodedAccountList,

        };
    }

    const encodeBrief = (worksheet) => {
        return {
            id: worksheet.period.id,
            name: worksheet.period.name
        };
    }

    return {
        validate,
        decode,
        encode,
        encodeBrief,
    }
}
