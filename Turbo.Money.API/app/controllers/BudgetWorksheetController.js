
module.exports = (logger, business) => {

    const owner = 'BudgetWorksheetController';

    const encode = (sections) => {
        sections.map(section => {
            section.direction = section.direction < 0 ? "in" : section.direction > 0 ? "out" : "other";
        });
        return [null, sections];

        /*
        let dataList = sections.map(section => {
            let sectionData = {
                id: section.id,
                name: section.name,
                description: section.description,
                direction: section.direction < 0 ? "in" : section.direction > 0 ? "out" : "other"
            };

            sectionData.categories = section.categories.map(category => {
                let categoryData = {
                    id: category.id,
                    name: category.name,
                    description: category.description,
                    sectionId: category.sectionId
                };

                categoryData.accounts = category.accounts.map(account => {
                    let accountData = {
                        id: account.id,
                        name: account.name,
                        description: account.description,
                        categoryId: account.categoryId,
                        amount: account.amount,
                        method: account.method,
                        type: account.type
                    };

                    return accountData;
                });

                return categoryData;
            });

            return sectionData;
        });
        return [null, dataList];
        */
    }

    const handleError = (source, res, code, error) => {
        if (error) {
            logger.debug(owner, `${owner}.${source}: error = `, error);
            res.status(code).send({
                message: error
            });
            return true;
        }
        return false;
    }

    // Retrieve all objects from the database.
    const getAll = async (req, res) => {
        let [error, sectionList] = await business.getAll();
        if (handleError("getAll", res, 500, error))
            return;

        logger.debug(owner, `${owner}.getAll: sectionList = `, sectionList);
        [error, dataList] = encode(sectionList);
        if (handleError("getAll", res, 500, error))
            return;

        logger.debug(owner, `${owner}.getAll: dataList = `, dataList);
        res.send(dataList);
    };

    return {
        getAll,
    };
}
