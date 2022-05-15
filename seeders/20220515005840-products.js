'use strict';

const data = require("../products.json")

module.exports = {
  async up (queryInterface, Sequelize) {
    
    const updateData = data.arrayOfProducts.map((item) => {
      return {
        id: item.id,
        name: item.name,
        qty: item.qty,
        picture: item.picture,
        expiredAt: item.expiredAt,
        isActive: item.isActive
      }
    })

     await queryInterface.bulkInsert('products', updateData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
