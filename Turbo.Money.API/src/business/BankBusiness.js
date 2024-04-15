
module.exports = function BankBusiness(logger, data) {

    const createSampleData = async (userCookie) => {

        let banks = [
            { name: "National Bank", number: "001", branch: "00001" },
            { name: "Credit Card Company", number: "009", branch: "00009" }
        ];

        let bankAccounts = [
            { name: "Chequing", bankName: "National Bank", number: "6354933" },
            { name: "Savings", bankName: "National Bank", number: "6543210" },
            { name: "Credit Card", bankName: "Credit Card Company", number: "1234010012349876" }
        ];

        return await data.createSampleData(userCookie, banks, bankAccounts);
    };

    return {
        createSampleData,
    };
}
