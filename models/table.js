const Sequelize = require('sequelize');

module.exports = class Table extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        table_no: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        table_name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'Table',
        tableName: 'tables',
        paranoid: false,
        charset: ' utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
};
