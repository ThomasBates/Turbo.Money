
module.exports = function BudgetData(logger, errors, db) {
    const module = BudgetData.name;
    const category = "Budget";

    const createSampleData = async (userCookie, budgetSections, budgetCategories, budgetAccounts) => {
        const context = `${module}.${createSampleData.name}`;

        try {

            await Promise.all(
                budgetSections.map(async section => {
                    let data = await db.section.create({
                        name: section.name,
                        description: section.description,
                        direction: section.direction,
                        UserFamilyId: userCookie.familyId,
                    });
                    section.id = data.id;
                })
            );

            await Promise.all(
                budgetCategories.map(async category => {
                    let section = budgetSections.find(section => section.name === category.sectionName);
                    let data = await db.category.create({
                        name: category.name,
                        description: category.description,
                        BudgetSectionId: section.id,
                        UserFamilyId: userCookie.familyId,
                    });
                    category.id = data.id;
                })
            );

            await Promise.all(
                budgetAccounts.map(async account => {
                    let category = budgetCategories.find(category => category.name === account.categoryName);
                    let data = await db.account.create({
                        name: account.name,
                        description: account.description,
                        BudgetCategoryId: category.id,
                        amount: account.amount,
                        type: account.type,
                        method: account.method,
                        UserFamilyId: userCookie.familyId,
                    });
                })
            );

            return {};
        }
        catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return errors.create(context, 'Catch', ex.message);
        }
    };

    return {
        createSampleData,
    }
}