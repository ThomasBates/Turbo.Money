const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "user_families", deps: []
 * createTable() => "user_users", deps: []
 * createTable() => "bank_banks", deps: [user_families]
 * createTable() => "bank_accounts", deps: [user_families, bank_banks]
 * createTable() => "bank_transactions", deps: [user_families, bank_accounts]
 * createTable() => "budget_sections", deps: [user_families]
 * createTable() => "budget_categories", deps: [user_families, budget_sections]
 * createTable() => "budget_accounts", deps: [user_families, budget_categories]
 * createTable() => "user_authorizations", deps: [user_users]
 * createTable() => "user_roles", deps: [user_families]
 * createTable() => "user_family_roles", deps: [user_users, user_families, user_roles]
 * createTable() => "user_grants", deps: [user_roles]
 *
 */

const info = {
  revision: 1,
  name: "initial_model",
  created: "2024-03-26T12:49:09.607Z",
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
        activeFrom: { type: Sequelize.DATE, field: "active_from" },
        activeTo: { type: Sequelize.DATE, field: "active_to" },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        isInitial: { type: Sequelize.BOOLEAN, field: "is_initial" },
        tag: { type: Sequelize.STRING, field: "tag" },
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
        activeFrom: { type: Sequelize.DATE, field: "active_from" },
        activeTo: { type: Sequelize.DATE, field: "active_to" },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        email: {
          type: Sequelize.STRING,
          field: "email",
          unique: true,
          allowNull: false,
        },
        picture: { type: Sequelize.STRING, field: "picture" },
        subscription: { type: Sequelize.STRING, field: "subscription" },
        tag: { type: Sequelize.STRING, field: "tag" },
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
        activeFrom: { type: Sequelize.DATE, field: "active_from" },
        activeTo: { type: Sequelize.DATE, field: "active_to" },
        name: { type: Sequelize.STRING, field: "name" },
        number: { type: Sequelize.STRING, field: "number" },
        transit: { type: Sequelize.STRING, field: "transit" },
        tag: { type: Sequelize.STRING, field: "tag" },
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
        activeFrom: { type: Sequelize.DATE, field: "active_from" },
        activeTo: { type: Sequelize.DATE, field: "active_to" },
        name: { type: Sequelize.STRING, field: "name" },
        number: { type: Sequelize.STRING, field: "number" },
        tag: { type: Sequelize.STRING, field: "tag" },
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
        tag: { type: Sequelize.STRING, field: "tag" },
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
      "budget_sections",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        activeFrom: { type: Sequelize.DATE, field: "active_from" },
        activeTo: { type: Sequelize.DATE, field: "active_to" },
        name: { type: Sequelize.STRING, field: "name" },
        description: { type: Sequelize.STRING, field: "description" },
        direction: { type: Sequelize.STRING, field: "direction" },
        displayOrder: { type: Sequelize.INTEGER, field: "display_order" },
        tag: { type: Sequelize.STRING, field: "tag" },
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
      "budget_categories",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        activeFrom: { type: Sequelize.DATE, field: "active_from" },
        activeTo: { type: Sequelize.DATE, field: "active_to" },
        name: { type: Sequelize.STRING, field: "name" },
        description: { type: Sequelize.STRING, field: "description" },
        displayOrder: { type: Sequelize.INTEGER, field: "display_order" },
        tag: { type: Sequelize.STRING, field: "tag" },
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
      "budget_accounts",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        activeFrom: { type: Sequelize.DATE, field: "active_from" },
        activeTo: { type: Sequelize.DATE, field: "active_to" },
        name: { type: Sequelize.STRING, field: "name" },
        description: { type: Sequelize.STRING, field: "description" },
        amount: { type: Sequelize.DECIMAL(10, 2).UNSIGNED, field: "amount" },
        type: { type: Sequelize.STRING, field: "type" },
        method: { type: Sequelize.STRING, field: "method" },
        displayOrder: { type: Sequelize.INTEGER, field: "display_order" },
        tag: { type: Sequelize.STRING, field: "tag" },
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
    params: ["budget_sections", { transaction }],
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
