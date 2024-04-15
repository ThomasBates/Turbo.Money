const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * renameColumn(transit) => "bank_banks"
 *
 */

const info = {
  revision: 2,
  name: "bank_transit_to_branch",
  created: "2024-04-15T17:20:08.261Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "renameColumn",
    params: ["bank_banks", "transit", "branch"],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "renameColumn",
    params: ["bank_banks", "branch", "transit"],
  },
];

module.exports = require('./common/common_migration')(migrationCommands, rollbackCommands);
