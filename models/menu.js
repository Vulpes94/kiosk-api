const Sequelize = require('sequelize');

module.exports = class Menu extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        menu_no: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        menu_name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        menu_price: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        menu_stock: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'Menu',
        tableName: 'menus',
        paranoid: false,
        charset: ' utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
};
