const Sequelize = require('sequelize');

module.exports = class DailySales extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        sales_no: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        menu_no: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        menu_name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        sales_quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        menu_price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        total_price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'DailySales',
        tableName: 'dailysales',
        paranoid: false,
        charset: ' utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
};
