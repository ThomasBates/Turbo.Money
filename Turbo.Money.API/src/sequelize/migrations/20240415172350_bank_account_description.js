const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * addColumn(description) => "bank_accounts"
 * addColumn(description) => "bank_banks"
 *
 */

const info = {
  revision: 3,
  name: "bank_account_description",
  created: "2024-04-15T17:23:50.580Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "addColumn",
    params: [
      "bank_accounts",
      "description",
      { type: Sequelize.STRING, field: "description" },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "bank_banks",
      "description",
      { type: Sequelize.STRING, field: "description" },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["bank_accounts", "description", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["bank_banks", "description", { transaction }],
  },
];

module.exports = require('./common/common_migration')(migrationCommands, rollbackCommands);
