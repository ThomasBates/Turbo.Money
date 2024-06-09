const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "user_families", deps: []
 * createTable() => "user_users", deps: []
 * createTable() => "bank_banks", deps: [user_families]
 * createTable() => "budget_periods", deps: [user_families]
 * createTable() => "bank_accounts", deps: [user_families, bank_banks]
 * createTable() => "bank_transactions", deps: [user_families, bank_accounts]
 * createTable() => "bank_account_periods", deps: [user_families, bank_accounts, budget_periods]
 * createTable() => "budget_sections", deps: [user_families, budget_periods]
 * createTable() => "budget_categories", deps: [user_families, budget_periods, budget_sections]
 * createTable() => "budget_schedules", deps: [user_families]
 * createTable() => "budget_accounts", deps: [user_families, budget_periods, budget_categories]
 * createTable() => "budget_transactions", deps: [user_families, budget_periods, budget_accounts, bank_transactions]
 * createTable() => "user_authorizations", deps: [user_users]
 * createTable() => "user_roles", deps: [user_families]
 * createTable() => "user_family_roles", deps: [user_users, user_families, user_roles]
 * createTable() => "user_grants", deps: [user_roles]
 *
 */

const info = {
  revision: 1,
  name: "initial_model",
  created: "2024-05-27T23:32:33.303Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "user_families",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        activeStart: { type: Sequelize.DATE, field: "active_start" },
        activeEnd: { type: Sequelize.DATE, field: "active_end" },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        isInitial: { type: Sequelize.BOOLEAN, field: "is_initial" },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "user_users",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        activeStart: { type: Sequelize.DATE, field: "active_start" },
        activeEnd: { type: Sequelize.DATE, field: "active_end" },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        email: {
          type: Sequelize.STRING,
          field: "email",
          unique: true,
          allowNull: false,
        },
        picture: { type: Sequelize.STRING, field: "picture" },
        subscription: { type: Sequelize.STRING, field: "subscription" },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "bank_banks",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        activeStart: { type: Sequelize.DATE, field: "active_start" },
        activeEnd: { type: Sequelize.DATE, field: "active_end" },
        name: { type: Sequelize.STRING, field: "name" },
        description: { type: Sequelize.STRING, field: "description" },
        number: { type: Sequelize.STRING, field: "number" },
        branch: { type: Sequelize.STRING, field: "branch" },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
        },
        UserFamilyId: {
          type: Sequelize.INTEGER,
          field: "user_family_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "user_families", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "budget_periods",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name" },
        description: { type: Sequelize.STRING, field: "description" },
        start: { type: Sequelize.DATE, field: "start" },
        end: { type: Sequelize.DATE, field: "end" },
        isSandbox: {
          type: Sequelize.BOOLEAN,
          field: "is_sandbox",
          default: false,
        },
        isClosed: {
          type: Sequelize.BOOLEAN,
          field: "is_closed",
          default: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
        },
        UserFamilyId: {
          type: Sequelize.INTEGER,
          field: "user_family_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "user_families", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "bank_accounts",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        activeStart: { type: Sequelize.DATE, field: "active_start" },
        activeEnd: { type: Sequelize.DATE, field: "active_end" },
        name: { type: Sequelize.STRING, field: "name" },
        description: { type: Sequelize.STRING, field: "description" },
        number: { type: Sequelize.STRING, field: "number" },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
        },
        UserFamilyId: {
          type: Sequelize.INTEGER,
          field: "user_family_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "user_families", key: "id" },
          allowNull: true,
        },
        BankBankId: {
          type: Sequelize.INTEGER,
          field: "bank_bank_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "bank_banks", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "bank_transactions",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        timeStamp: { type: Sequelize.DATE, field: "time_stamp" },
        description: { type: Sequelize.STRING, field: "description" },
        amount: { type: Sequelize.DECIMAL(10, 2), field: "amount" },
        balance: { type: Sequelize.DECIMAL(10, 2), field: "balance" },
        sequence: { type: Sequelize.STRING, field: "sequence" },
        doubleEntryId: { type: Sequelize.INTEGER, field: "double_entry_id" },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
        },
        UserFamilyId: {
          type: Sequelize.INTEGER,
          field: "user_family_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "user_families", key: "id" },
          allowNull: true,
        },
        BankAccountId: {
          type: Sequelize.INTEGER,
          field: "bank_account_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "bank_accounts", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "bank_account_periods",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        openingBalance: {
          type: Sequelize.DECIMAL(10, 2).UNSIGNED,
          field: "opening_balance",
        },
        closingBalance: {
          type: Sequelize.DECIMAL(10, 2).UNSIGNED,
          field: "closing_balance",
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
        },
        UserFamilyId: {
          type: Sequelize.INTEGER,
          field: "user_family_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "user_families", key: "id" },
          allowNull: true,
        },
        BankAccountId: {
          type: Sequelize.INTEGER,
          field: "bank_account_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "bank_accounts", key: "id" },
          allowNull: true,
        },
        BudgetPeriodId: {
          type: Sequelize.INTEGER,
          field: "budget_period_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "budget_periods", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "budget_sections",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name" },
        description: { type: Sequelize.STRING, field: "description" },
        direction: { type: Sequelize.STRING, field: "direction" },
        displayOrder: { type: Sequelize.INTEGER, field: "display_order" },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
        },
        UserFamilyId: {
          type: Sequelize.INTEGER,
          field: "user_family_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "user_families", key: "id" },
          allowNull: true,
        },
        BudgetPeriodId: {
          type: Sequelize.INTEGER,
          field: "budget_period_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "budget_periods", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "budget_categories",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name" },
        description: { type: Sequelize.STRING, field: "description" },
        displayOrder: { type: Sequelize.INTEGER, field: "display_order" },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
        },
        UserFamilyId: {
          type: Sequelize.INTEGER,
          field: "user_family_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "user_families", key: "id" },
          allowNull: true,
        },
        BudgetPeriodId: {
          type: Sequelize.INTEGER,
          field: "budget_period_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "budget_periods", key: "id" },
          allowNull: true,
        },
        BudgetSectionId: {
          type: Sequelize.INTEGER,
          field: "budget_section_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "budget_sections", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "budget_schedules",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        type: { type: Sequelize.STRING, field: "type" },
        multiple: { type: Sequelize.INTEGER, field: "multiple" },
        weekDay: { type: Sequelize.STRING, field: "week_day" },
        monthDays: { type: Sequelize.STRING, field: "month_days" },
        yearDates: { type: Sequelize.STRING, field: "year_dates" },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
        },
        UserFamilyId: {
          type: Sequelize.INTEGER,
          field: "user_family_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "user_families", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "budget_accounts",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name" },
        description: { type: Sequelize.STRING, field: "description" },
        displayOrder: { type: Sequelize.INTEGER, field: "display_order" },
        amount: { type: Sequelize.DECIMAL(10, 2).UNSIGNED, field: "amount" },
        type: { type: Sequelize.STRING, field: "type" },
        method: { type: Sequelize.STRING, field: "method" },
        openingBalance: {
          type: Sequelize.DECIMAL(10, 2).UNSIGNED,
          field: "opening_balance",
        },
        closingBalance: {
          type: Sequelize.DECIMAL(10, 2).UNSIGNED,
          field: "closing_balance",
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
        },
        UserFamilyId: {
          type: Sequelize.INTEGER,
          field: "user_family_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "user_families", key: "id" },
          allowNull: true,
        },
        BudgetPeriodId: {
          type: Sequelize.INTEGER,
          field: "budget_period_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "budget_periods", key: "id" },
          allowNull: true,
        },
        BudgetCategoryId: {
          type: Sequelize.INTEGER,
          field: "budget_category_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "budget_categories", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "budget_transactions",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        timeStamp: { type: Sequelize.DATE, field: "time_stamp" },
        description: { type: Sequelize.STRING, field: "description" },
        amount: { type: Sequelize.DECIMAL(10, 2), field: "amount" },
        sequence: { type: Sequelize.STRING, field: "sequence" },
        doubleEntryId: { type: Sequelize.INTEGER, field: "double_entry_id" },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
        },
        UserFamilyId: {
          type: Sequelize.INTEGER,
          field: "user_family_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "user_families", key: "id" },
          allowNull: true,
        },
        BudgetPeriodId: {
          type: Sequelize.INTEGER,
          field: "budget_period_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "budget_periods", key: "id" },
          allowNull: true,
        },
        BudgetAccountId: {
          type: Sequelize.INTEGER,
          field: "budget_account_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "budget_accounts", key: "id" },
          allowNull: true,
        },
        BankTransactionId: {
          type: Sequelize.INTEGER,
          field: "bank_transaction_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "bank_transactions", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "user_authorizations",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        source: { type: Sequelize.STRING, field: "source", allowNull: false },
        sourceId: {
          type: Sequelize.STRING,
          field: "source_id",
          allowNull: false,
        },
        passwordHash: { type: Sequelize.STRING, field: "password_hash" },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
        },
        UserUserId: {
          type: Sequelize.INTEGER,
          field: "user_user_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "user_users", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "user_roles",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        isHead: { type: Sequelize.BOOLEAN, field: "is_head", default: false },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
        },
        UserFamilyId: {
          type: Sequelize.INTEGER,
          field: "user_family_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "user_families", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "user_family_roles",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
        },
        UserUserId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "user_user_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "user_users", key: "id" },
          unique: "user_family_roles_UserFamilyId_UserUserId_unique",
        },
        UserFamilyId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "user_family_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "user_families", key: "id" },
          unique: "user_family_roles_UserFamilyId_UserUserId_unique",
        },
        UserRoleId: {
          type: Sequelize.INTEGER,
          field: "user_role_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "user_roles", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "user_grants",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
        },
        UserRoleId: {
          type: Sequelize.INTEGER,
          field: "user_role_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "user_roles", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["bank_accounts", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["bank_account_periods", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["bank_banks", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["bank_transactions", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["budget_accounts", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["budget_categories", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["budget_periods", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["budget_schedules", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["budget_sections", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["budget_transactions", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["user_authorizations", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["user_families", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["user_family_roles", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["user_grants", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["user_roles", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["user_users", { transaction }],
  },
];

module.exports = require('./common/common_migration')(migrationCommands, rollbackCommands);
