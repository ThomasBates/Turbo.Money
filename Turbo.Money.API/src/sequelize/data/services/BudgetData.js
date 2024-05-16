
module.exports = function BudgetData(logger, errors, db) {
    const module = BudgetData.name;
    const category = "Budget";

    const periodConverter = require("./converters/BudgetPeriodDataConverter")(errors);
    //const worksheetConverter = require("./converters/BudgetWorksheetDataConverter")(errors);
    const helper = require('./converters/ConverterHelper')(logger, errors);

    const createSampleData = async (familyId, worksheet) => {
        const context = `${module}.${createSampleData.name}`;

        try {
            logger.verbose(category, context, 'familyId =', familyId);
            const family = await db.user.family.findByPk(familyId);
            if (!family)
                return errors.create(context, 'MissingData', `No family for id = ${familyId}`);
            logger.verbose(category, context, 'family =', family);

            logger.verbose(category, context, 'worksheet.period =', worksheet.budgetPeriod);
            const period = await family.createBudgetPeriod(worksheet.budgetPeriod);
            if (!period)
                return errors.create(context, 'MissingData', `Failed to create period ${worksheet.budgetPeriod.name}`);
            logger.verbose(category, context, 'period =', period);

            await Promise.all(
                worksheet.budgetSectionList.map(async section => {
                    const data = await period.createBudgetSection({
                        name: section.name,
                        description: section.description,
                        direction: section.direction,
                        UserFamilyId: familyId,
                    }, {
                        through: {
                            UserFamilyId: familyId,
                            displayOrder: section.displayOrder,
                        }
                    });

                    section.id = data.id;
                })
            );

            await Promise.all(
                worksheet.budgetCategoryList.map(async category => {
                    const section = worksheet.budgetSectionList.find(section =>
                        section.name === category.sectionName);

                    const data = await period.createBudgetCategory({
                        name: category.name,
                        description: category.description,
                        UserFamilyId: familyId,
                    }, {
                        through: {
                            UserFamilyId: familyId,
                            BudgetSectionId: section.id,
                            displayOrder: category.displayOrder,
                        }
                    });

                    category.id = data.id;
                })
            );

            await Promise.all(
                worksheet.budgetAccountList.map(async account => {
                    const category = worksheet.budgetCategoryList.find(category =>
                        category.name === account.categoryName);

                    const data = await period.createBudgetAccount({
                        name: account.name,
                        description: account.description,
                        displayOrder: account.displayOrder,
                        amount: account.amount,
                        type: account.type,
                        method: account.method,
                        UserFamilyId: familyId,
                    });
                })
            );

            const decodedBudgetPeriod = {
                id: period.id,
                name: period.name,
                description: period.description,
                isSandbox: period.isSandbox,
                isSealed: period.isSealed,
            }

            return decodedBudgetPeriod;
        }
        catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return errors.create(context, 'Catch', ex.message);
        }
    };

    const loadWorksheet = async (familyId, periodId) => {
        const context = `${module}.${loadWorksheet.name}`;

        try {
            logger.verbose(category, context, 'periodId =', periodId);
            const period = await db.budget.period.findByPk(periodId);
            if (!period)
                return errors.create(context, 'MissingData', `Cannot find budget period with id=${periodId}.`);
            logger.verbose(category, context, 'period =', period);
            if (period.UserFamilyId != familyId)
                return errors.create(context, 'SecurityBreach', `period's family (${period.UserFamilyId}) is not user's family (${familyId}).`);

            const decodedPeriod = helper.decodeObject(familyId, period, periodConverter.decode);
            if (decodedPeriod.error)
                return errors.create(context, decodedPeriod.error.code, decodedPeriod);

            const sectionList = await period.getBudgetSections();
            const decodedSectionList = helper.decodeList(familyId, sectionList, sectionConverter.decode);
            if (decodedSectionList.error)
                return errors.create(context, decodedSectionList.error.code, decodedSectionList);

            const categoryList = await period.getBudgetCategories();
            const decodedCategoryList = helper.decodeList(familyId, categoryList, categoryConverter.decode);
            if (decodedCategoryList.error)
                return errors.create(context, decodedCategoryList.error.code, decodedCategoryList);

            const accountList = await period.getBudgetAccounts();
            const decodedAccountList = helper.decodeList(familyId, accountList, accountConverter.decode);
            if (decodedAccountList.error)
                return errors.create(context, decodedAccountList.error.code, decodedAccountList);

            return {
                period: decodedPeriod,
                sectionList: decodedSectionList,
                categoryList: decodedCategoryList,
                accountList: decodedAccountList,
            }

        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return errors.create(context, 'Catch', ex.message);
        }

        return worksheet;
    }

    const saveWorksheet = async (familyId, worksheet) => {
        const context = `${module}.${loadWorksheet.name}`;

        const status = await data.saveWorksheet(familyId, worksheet);
        logger.debug(category, context, 'status =', status);
        if (status.error)
            return errors.create(context, status.error.code, status);

        return status;
    }

    return {
        createSampleData,
        loadWorksheet,
        saveWorksheet,
    };
}