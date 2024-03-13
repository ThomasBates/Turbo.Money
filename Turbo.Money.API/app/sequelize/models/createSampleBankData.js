module.exports = async function createSampleBankData(db) {

    let banks = [
        { name: "National Bank", number: "001", transit: "00001" },
        { name: "Credit Card Company", number: "009", transit: "00009" }
    ];

    let bankAccounts = [
        { name: "Chequing", bankName: "National Bank", number: "6354933" },
        { name: "Savings", bankName: "National Bank", number: "6543210" },
        { name: "Credit Card", bankName: "Credit Card Company", number: "1234010012349876" }
    ];

    await Promise.all(
        banks.map(async bank => {
            let data = await db.banks.create({
                name: bank.name,
                number: bank.number,
                transit: bank.transit
            });
            bank.id = data.id;
        })
    );

    await Promise.all(
        bankAccounts.map(async account => {
            let bank = banks.find(bank => bank.name === account.bankName);
            await db.bankAccounts.create({
                name: account.name,
                bank_id: bank.id,
                number: account.number
            });
        })
    );
}