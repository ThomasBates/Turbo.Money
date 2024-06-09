
module.exports = function BudgetData(logger, errors, db) {
    const module = BudgetData.name;
    const category = "Budget";

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
                isClosed: period.isClosed,
            }

            return decodedBudgetPeriod;
        }
        catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return errors.create(context, 'Catch', ex.message);
        }
    };

    return {
        createSampleData,
    };
}