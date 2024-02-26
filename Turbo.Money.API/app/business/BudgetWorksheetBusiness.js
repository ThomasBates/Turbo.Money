
module.exports = (logger, sectionData, categoryData, accountData) => {

    const getAll = async () => {
        let [error, sections] = await sectionData.getAll();
        [error, categories] = await categoryData.getAll();
        [error, accounts] = await accountData.getAll();

        if (error) {
            return [error, null];
        }

        logger.debug("Worksheet", sections);
        logger.debug("Worksheet", categories);

        sections.map(section => {
            section.categories = categories.filter(category => category.sectionId == section.id);

            section.categories.map(category => {
                category.accounts = accounts.filter(account => account.categoryId == category.id);
            });
        });

        logger.debug("Worksheet", sections);

        return [null, sections];
    }

    return {
        getAll
    };
}
