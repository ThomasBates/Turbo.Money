
module.exports = function CommonMigration(getMigrationCommands, getRollbackCommands) {

    const execute = (queryInterface, getCommands) => {
        let index = 0;
        const run = (transaction) => {
            const commands = getCommands(transaction);
            return new Promise((resolve, reject) => {
                const next = () => {
                    if (index < commands.length) {
                        const command = commands[index];
                        console.log(`[#${index}] execute: ${command.fn}`);
                        index++;
                        queryInterface[command.fn](...command.params).then(next, reject);
                    } else resolve();
                };
                next();
            });
        };
        return queryInterface.sequelize.transaction(run);
    };

    return {
        up: (migration) =>
            execute(migration.context, getMigrationCommands),
        down: (migration) =>
            execute(migration.context, getRollbackCommands),
    };
}

/*
Replace the code in the bottom of the migration file with this line:

module.exports = require('./common/common_migration')(migrationCommands, rollbackCommands);

*/