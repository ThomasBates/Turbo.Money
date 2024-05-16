
module.exports = function BudgetBusiness(logger, errors, data) {
    const module = BudgetBusiness.name;
    const category = 'Budget';

    const createSampleData = async (familyId, initial = false) => {
        const context = `${module}.${createSampleData.name}`;
        logger.debug(category, context, 'familyId =', familyId);
        logger.debug(category, context, 'initial =', initial);

        //if (initial) {
        //    const initialPeriod = await data.budgetPeriod.getOne(familyId, 1);
        //    if (!initialPeriod.error)
        //        return initialPeriod;
        //    if (initialPeriod.error.code !== 'MissingData')
        //        return errors.create(context, initialPeriod.error.code, initialPeriod);
        //}

        const periodList = await data.budgetPeriod.getAll(familyId);
        logger.debug(category, context, 'periodList =', periodList);
        if (periodList.error)
            return errors.create(context, periodList.error.code, periodList);

        let periodName = 'Sample';
        let periodDescription = 'sample Budget Data';

        if (initial) {
            const initialPeriod = periodList.list.find(p => p.name == periodName);
            if (initialPeriod)
                return initialPeriod;
        }

        for (let i = 1; ; i++) {
            const period = periodList.list.find(p => p.name === periodName);
            if (!period)
                break;
            periodName = `Sample ${i}`;
            periodDescription = `Sample Budget Data ${i}`;
        }

        const period = { id: -1, name: periodName, description: periodDescription, isSandbox: true, isSealed: false };

        const sectionList = [
            { id: -1, periodId: -1, displayOrder: 1, name: "Income", description: "Income", direction: -1 },
            { id: -2, periodId: -1, displayOrder: 2, name: "Expenses", description: "Expenses", direction: 1 }
        ];

        const categoryList = [
            { id: -1, sectionId: -1, displayOrder: 1, name: "Employment Income", description: "Employment Income" },
            { id: -2, sectionId: -1, displayOrder: 2, name: "Other Income", description: "Bonuses, gifts, etc." },

            { id: -3, sectionId: -2, displayOrder: 1, name: "Necessary", description: "Tithing, rent, utitilites, food, etc." },
            { id: -4, sectionId: -2, displayOrder: 2, name: "Important", description: "Phones, internet, etc." },
            { id: -5, sectionId: -2, displayOrder: 3, name: "Fun", description: "Entertainment, treats, etc." },
            { id: -6, sectionId: -2, displayOrder: 4, name: "Irregular", description: "Car/home maintance, holidays, etc.", }
        ];

        const accountList = [
            { id: -1, categoryId: -1, displayOrder: 1, name: "Paycheque", description: "Paycheque", amount: 5280.00, type: "min", method: "Automatic" },
            { id: -2, categoryId: -2, displayOrder: 1, name: "Other Income", description: "Other Income", amount: 0.00, type: "min", method: "Ad hoc" },

            { id: -3, categoryId: -3, displayOrder: 1, name: "Rent", description: "Rent", amount: 1700.00, type: "fix", method: "Post-dated cheques" },
            { id: -4, categoryId: -3, displayOrder: 2, name: "Electricity", description: "Enmax", amount: 340.00, type: "est", method: "PAD" },
            { id: -5, categoryId: -3, displayOrder: 3, name: "Natural Gas", description: "Direct Energy", amount: 100.00, type: "est", method: "Automated bill payment" },
            { id: -6, categoryId: -3, displayOrder: 4, name: "Groceries", description: "Groceries", amount: 200.00, type: "max", method: "Debit" },

            { id: -7, categoryId: -4, displayOrder: 1, name: "Charity", description: "Charity donation", amount: 100.00, type: "fix", method: "Church website" },
            { id: -8, categoryId: -4, displayOrder: 2, name: "Dates", description: "Dates", amount: 100.00, type: "max", method: "Debit" },
            { id: -9, categoryId: -4, displayOrder: 3, name: "Allowance", description: "Allowance", amount: 100.00, type: "fix", method: "Automated transfer" },

            { id: -10, categoryId: -5, displayOrder: 1, name: "Entertainment", description: "Concerts, plays, movies, etc.", amount: 100.00, type: "avg", method: "TD Cashback" },

            { id: -11, categoryId: -6, displayOrder: 1, name: "Car Maintenance", description: "Oil changes, winter tires, etc.", amount: 50.00, type: "fix", method: "Automated transfer" },
            { id: -12, categoryId: -6, displayOrder: 2, name: "Home Maintenance", description: "Home & yard function & beauty", amount: 50.00, type: "max", method: "Debit" },
        ];

        const state = 'created';
        const worksheet = {
            period: { ...period, state },
            sectionList: sectionList.map(section => ({ ...section, state })),
            categoryList: categoryList.map(category => ({ ...category, state })),
            accountList: accountList.map(account => ({ ...account, state })),
        };

        //return await data.budget.createSampleData(familyId, worksheet);
        return await saveBudgetWorksheet(familyId, worksheet);
    };

    const getBudgetPeriodList = async (familyId) => {
        const context = `${module}.${getBudgetPeriodList.name}`;

        const periodList = await data.budgetPeriod.getAll(familyId);
        logger.debug(category, context, 'periodList =', periodList);
        if (periodList.error)
            return errors.create(context, periodList.error.code, periodList);

        return periodList;
    }

    const loadBudgetWorksheet = async (familyId, periodId) => {
        const context = `${module}.${loadBudgetWorksheet.name}`;

        const period = await data.budgetPeriod.getOne(familyId, periodId);
        logger.debug(category, context, 'period =', period);
        if (period.error)
            return errors.create(context, period.error.code, period);

        const sectionList = await data.budgetSection.getAllForPeriod(familyId, periodId);
        logger.debug(category, context, 'sections =', sectionList);
        if (sectionList.error)
            return errors.create(context, sectionList.error.code, sectionList);

        const categoryList = await data.budgetCategory.getAllForPeriod(familyId, periodId);
        logger.debug(category, context, 'categoryList =', categoryList);
        if (categoryList.error)
            return errors.create(context, categoryList.error.code, categoryList);

        const accountList = await data.budgetAccount.getAllForPeriod(familyId, periodId);
        logger.debug(category, context, 'accounts =', accountList);
        if (accountList.error)
            return errors.create(context, accountList.error.code, accountList);

        const state = 'read';
        const worksheet = {
            period: { ...period, state },
            sectionList: sectionList.list.map(section => ({ ...section, state })),
            categoryList: categoryList.list.map(category => ({ ...category, state })),
            accountList: accountList.list.map(account => ({ ...account, state })),
        };

        return worksheet;
    }

    const saveBudgetWorksheet = async (familyId, worksheet) => {
        const context = `${module}.${saveBudgetWorksheet.name}`;

        const deleteResult = await deleteWorksheetObjects(familyId, worksheet);
        if (deleteResult.error)
            return errors.create(context, deleteResult.error.code, deleteResult);

        let createdIdMap = new Map();
        let error = null;

        let returnPeriod;
        switch (worksheet.period.state) {
            case "created":
                returnPeriod = await data.budgetPeriod.create(
                    familyId, worksheet.period);
                createdIdMap.set(worksheet.period.id, returnPeriod.id);
                break;
            case "updated":
                returnPeriod = await data.budgetPeriod.update(
                    familyId, worksheet.period);
                break;
        }

        logger.verbose(category, context, 'returnPeriod =', returnPeriod);
        if (returnPeriod && returnPeriod.error)
            error = errors.create(context, returnPeriod.error.code, returnPeriod);


        logger.verbose(category, context, 'createdIdMap =', createdIdMap);
        if (createdIdMap.size > 0) {
            logger.verbose(category, context, 'worksheet.sectionList =', worksheet.sectionList);
            worksheet.sectionList = worksheet.sectionList.map(section => {
                if (section.periodId && section.periodId > 0)
                    return section;
                const newId = createdIdMap.get(section.periodId);
                if (newId)
                    return { ...section, periodId: newId };
                return section;
            });
            logger.verbose(category, context, 'worksheet.sectionList =', worksheet.sectionList);
        }

        const periodId = returnPeriod ? returnPeriod.id : worksheet.period.id;
        logger.verbose(category, context, 'periodId =', periodId);

        await Promise.all(
            worksheet.sectionList.map(async section => {
                if (error)
                    return;

                let returnSection;
                switch (section.state) {
                    case "created":
                        returnSection = await data.budgetSection.createForPeriod(
                            familyId, periodId, section);
                        createdIdMap.set(section.id, returnSection.id);
                        break;
                    case "updated":
                        returnSection = await data.budgetSection.updateForPeriod(
                            familyId, periodId, section);
                        break;
                }

                if (returnSection && returnSection.error)
                    error = errors.create(context, returnSection.error.code, returnSection);
            })
        );
        if (error)
            return error;

        if (createdIdMap.size > 0) {
            worksheet.categoryList = worksheet.categoryList.map(category => {
                if (category.sectionId && category.sectionId > 0)
                    return category;
                const newId = createdIdMap.get(category.sectionId);
                if (newId)
                    return { ...category, sectionId: newId };
                return category;
            });
        }

        createdIdMap = new Map();

        await Promise.all(
            worksheet.categoryList.map(async category => {
                if (error)
                    return;

                let returnCategory;
                switch (category.state) {
                    case "created":
                        returnCategory = await data.budgetCategory.createForPeriod(
                            familyId, periodId, category);
                        createdIdMap.set(category.id, returnCategory.id);
                        break;
                    case "updated":
                        returnCategory = await data.budgetCategory.updateForPeriod(
                            familyId, periodId, category);
                        break;
                }

                if (returnCategory && returnCategory.error)
                    error = errors.create(context, returnCategory.error.code, returnCategory);
            })
        );
        if (error)
            return error;

        if (createdIdMap.size > 0) {
            worksheet.accountList = worksheet.accountList.map(account => {
                if (account.categoryId && account.categoryId > 0)
                    return account;
                const newId = createdIdMap.get(account.categoryId);
                if (newId)
                    return { ...account, categoryId: newId };
                return account;
            });
        }

        createdIdMap = new Map();

        await Promise.all(
            worksheet.accountList.map(async account => {
                if (error)
                    return;

                let returnAccount;
                switch (account.state) {
                    case "created":
                        returnAccount = await data.budgetAccount.createForPeriod(
                            familyId, periodId, account);
                        createdIdMap.set(account.id, returnAccount.id);
                        break;
                    case "updated":
                        returnAccount = await data.budgetAccount.updateForPeriod(
                            familyId, periodId, account);
                        break;
                }

                if (returnAccount && returnAccount.error)
                    error = errors.create(context, returnAccount.error.code, returnAccount);
            })
        );
        if (error)
            return error;

        return await data.budgetPeriod.getOne(familyId, periodId);
    }

    // -------------------------------------------------------------------------

    const deleteWorksheetObjects = async (familyId, worksheet) => {
        const context = `${module}.${deleteWorksheetObjects.name}`;

        //  If period is new then there is nothing to delete.
        if (worksheet.period.state == 'created')
            return {};
        const periodId = worksheet.period.id;

        //  Cascade deleted objects from top to bottom.
        logger.verbose(category, context, 'worksheet.period =', worksheet.period);
        logger.verbose(category, context, 'worksheet.sectionList =', worksheet.sectionList);
        if (worksheet.period.state === 'deleted')
            worksheet.sectionList = worksheet.sectionList
                .map(section => ({ ...section, state: 'deleted' }));
        logger.verbose(category, context, 'worksheet.sectionList =', worksheet.sectionList);

        const deletedSectionIds = worksheet.sectionList
            .filter(section => section.state === 'deleted')
            .map(section => section.id);
        logger.verbose(category, context, 'deletedSectionIds =', deletedSectionIds);
        logger.verbose(category, context, 'worksheet.categoryList =', worksheet.categoryList);
        worksheet.categoryList = worksheet.categoryList
            .map(category => {
                return category.sectionId && deletedSectionIds.includes(category.sectionId)
                    ? { ...category, state: 'deleted' }
                    : category;
            });
        logger.verbose(category, context, 'worksheet.categoryList =', worksheet.categoryList);

        const deletedCategoryIds = worksheet.categoryList
            .filter(category => category.state === 'deleted')
            .map(category => category.id);
        logger.verbose(category, context, 'deletedCategoryIds =', deletedCategoryIds);
        logger.verbose(category, context, 'worksheet.accountList =', worksheet.accountList);
        worksheet.accountList = worksheet.accountList
            .map(account => {
                return account.categoryId && deletedCategoryIds.includes(account.categoryId)
                    ? { ...account, state: 'deleted' }
                    : account;
            });
        logger.verbose(category, context, 'worksheet.accountList =', worksheet.accountList);

        let error = null;

        const deleteObjectList = async (list, deleteOneForPeriod) => {
            const subContext = `${context}.${deleteObjectList.name}`;
            let error = null;
            await Promise.all(
                list.filter(item => item.state === 'deleted')
                    .map(async item => {
                        logger.verbose(category, subContext, 'item =', item);
                        if (error)
                            return;
                        const deletedObject = await deleteOneForPeriod(familyId, periodId, item.id);
                        logger.verbose(category, subContext, 'deletedObject =', deletedObject);
                        if (deletedObject.error)
                            error = errors.create(subContext, deletedObject.error.code, deletedObject);
                    })
            );
            return error || {};
        }

        //  Delete objects from bottom to top.
        const accountResult = await deleteObjectList(worksheet.accountList, data.budgetAccount.deleteOneForPeriod);
        logger.verbose(category, context, 'accountResult =', accountResult);
        if (accountResult.error)
            return errors.create(context, accountResult.error.code, accountResult);

        const categorytResult = await deleteObjectList(worksheet.categoryList, data.budgetCategory.deleteOneForPeriod);
        logger.verbose(category, context, 'categorytResult =', categorytResult);
        if (categorytResult.error)
            return errors.create(context, categorytResult.error.code, categorytResult);

        const sectionResult = await deleteObjectList(worksheet.sectionList, data.budgetSection.deleteOneForPeriod);
        logger.verbose(category, context, 'sectionResult =', sectionResult);
        if (sectionResult.error)
            return errors.create(context, sectionResult.error.code, sectionResult);

        if (worksheet.period.state == 'deleted') {
            const deletedPeriod = await data.budgetPeriod.remove(familyId, periodId);
            if (deletedPeriod.error)
                return errors.create(context, deletedPeriod.error.code, deletedPeriod);
        }

        return {};
    }

    return {
        createSampleData,
        getBudgetPeriodList,
        loadBudgetWorksheet,
        saveBudgetWorksheet,
    };
}
