
module.exports = (sectionData, categoryData, accountData) => {

    const getAll = async () => {
        let [error, sections] = await sectionData.getAll();
        [error, categories] = await categoryData.getAll();
        [error, accounts] = await accountData.getAll();

        if (error) {
            return [error, null];
        }

        console.log(sections);
        console.log(categories);

        sections.map(section => {
            section.categories = categories.filter(category => category.sectionId == section.id);

            section.categories.map(category => {
                category.accounts = accounts.filter(account => account.categoryId == category.id);
            });
        });

        console.log(sections);

        return [null, sections];
    }

    return {
        getAll
    };
}
