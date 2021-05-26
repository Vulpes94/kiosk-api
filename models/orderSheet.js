const Sequelize = require('sequelize');

module.exports = class DailySales extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        order_no: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        table_no: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        menu_no: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        menu_name: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        menu_price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        order_quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'OrderSheet',
        tableName: 'orders',
        paranoid: false,
        charset: ' utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
};
