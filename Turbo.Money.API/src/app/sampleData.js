
module.exports = async function sampleData(logger, errors, business) {

    logger.enableCategory('SampleData');

    const sampleUser = await business.user.createSampleData();
    logger.debug('SampleData', 'sampleData', 'sampleUser =', sampleUser);
    const familyId = sampleUser.selectedFamily.id;

    const samplePeriod = await business.budget.createSampleData(familyId, true);
    logger.debug('SampleData', 'sampleData', 'samplePeriod =', samplePeriod);
    const periodId = samplePeriod.id;
    return;

    let sampleWorksheet = await business.budget.loadWorksheet(familyId, periodId);
    logger.debug('SampleData', 'sampleData', 'sampleWorksheet =', sampleWorksheet);

    //  createForPeriod
    const newSection = await business.budgetSection.createForPeriod(familyId, periodId, {
        name: 'Sample',
        description: 'Sample Section',
        direction: 1,
        displayOrder: 3,
    });
    logger.debug('SampleData', 'sampleData', 'newSection =', newSection);

    const newCategory = await business.budgetCategory.createForPeriod(familyId, periodId, {
        name: 'Sample',
        description: 'Sample Category',
        displayOrder: 1,
        sectionId: newSection.id,
    });
    logger.debug('SampleData', 'sampleData', 'newCategory =', newCategory);

    const newAccount = await business.budgetAccount.createForPeriod(familyId, periodId, {
        name: 'Sample',
        description: 'Sample Account',
        displayOrder: 1,
        amount: 42.00,
        type: 'fix',
        method: "Don't panic",
        categoryId: newCategory.id,
    });
    logger.debug('SampleData', 'sampleData', 'newAccount =', newAccount);

    //  getAllForPeriod
    const sectionAllList = await business.budgetSection.getAllForPeriod(familyId, periodId);
    logger.debug('SampleData', 'sampleData', 'sectionAllList =', sectionAllList);

    const categoryAllList = await business.budgetCategory.getAllForPeriod(familyId, periodId);
    logger.debug('SampleData', 'sampleData', 'categoryAllList =', categoryAllList);

    const accountAllList = await business.budgetAccount.getAllForPeriod(familyId, periodId);
    logger.debug('SampleData', 'sampleData', 'accountAllList =', accountAllList);

    //  getListForPeriod
    const sectionList = await business.budgetSection.getListForPeriod(familyId, periodId);
    logger.debug('SampleData', 'sampleData', 'sectionList =', sectionList);

    const categoryList = await business.budgetCategory.getListForPeriod(familyId, periodId);
    logger.debug('SampleData', 'sampleData', 'categoryList =', categoryList);

    const accountList = await business.budgetAccount.getListForPeriod(familyId, periodId);
    logger.debug('SampleData', 'sampleData', 'accountList =', accountList);

    //  getOneForPeriod
    const oneSection = await business.budgetSection.getOneForPeriod(familyId, periodId, newSection.id);
    logger.debug('SampleData', 'sampleData', 'oneSection =', oneSection);

    const oneCategory = await business.budgetCategory.getOneForPeriod(familyId, periodId, newCategory.id);
    logger.debug('SampleData', 'sampleData', 'oneCategory =', oneCategory);

    const oneAccount = await business.budgetAccount.getOneForPeriod(familyId, periodId, newAccount.id);
    logger.debug('SampleData', 'sampleData', 'oneAccount =', oneAccount);

    //  updateForPeriod
    const updatedSection = await business.budgetSection.updateForPeriod(familyId, periodId, {
        ...newSection,
        description: 'Updated Sample Section',
    });
    logger.debug('SampleData', 'sampleData', 'updatedSection =', updatedSection);

    const updatedCategory = await business.budgetCategory.updateForPeriod(familyId, periodId, {
        ...newCategory,
        description: 'Updated Sample Category',
    });
    logger.debug('SampleData', 'sampleData', 'updatedCategory =', updatedCategory);

    const updatedAccount = await business.budgetAccount.updateForPeriod(familyId, periodId, {
        ...newAccount,
        description: 'Updated Sample Account',
    });
    logger.debug('SampleData', 'sampleData', 'updatedAccount =', updatedAccount);

    //  loadWorksheet
    sampleWorksheet = await business.budget.loadWorksheet(familyId, periodId);
    logger.debug('SampleData', 'sampleData', 'sampleWorksheet =', sampleWorksheet);

    //  deleteOneForPeriod
    const deletedSection = await business.budgetSection.deleteOneForPeriod(familyId, periodId, updatedSection.id);
    logger.debug('SampleData', 'sampleData', 'deletedSection =', deletedSection);

    const deletedCategory = await business.budgetCategory.deleteOneForPeriod(familyId, periodId, updatedCategory.id);
    logger.debug('SampleData', 'sampleData', 'deletedCategory =', deletedCategory);

    const deletedAccount = await business.budgetAccount.deleteOneForPeriod(familyId, periodId, updatedAccount.id);
    logger.debug('SampleData', 'sampleData', 'deletedAccount =', deletedAccount);

    //  deleteAllForPeriod
    const deletedSectionList = await business.budgetSection.deleteAllForPeriod(familyId, periodId);
    logger.debug('SampleData', 'sampleData', 'deletedSectionList =', deletedSectionList);

    const deletedCategoryList = await business.budgetCategory.deleteAllForPeriod(familyId, periodId);
    logger.debug('SampleData', 'sampleData', 'deletedCategoryList =', deletedCategoryList);

    const deletedAccountList = await business.budgetAccount.deleteAllForPeriod(familyId, periodId);
    logger.debug('SampleData', 'sampleData', 'deletedAccountList =', deletedAccountList);

    //  loadWorksheet
    sampleWorksheet = await business.budget.loadWorksheet(familyId, periodId);
    logger.debug('SampleData', 'sampleData', 'sampleWorksheet =', sampleWorksheet);

    const deletedPeriod = await business.budgetPeriod.deleteOne(familyId, periodId);
    logger.debug('SampleData', 'sampleData', 'deletedPeriod =', deletedPeriod);

    //  loadWorksheet
    sampleWorksheet = await business.budget.loadWorksheet(familyId, periodId);
    logger.debug('SampleData', 'sampleData', 'sampleWorksheet =', sampleWorksheet);
}
