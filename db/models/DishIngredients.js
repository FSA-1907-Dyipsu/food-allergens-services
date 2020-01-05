const connection = require('../connection');
const { Sequelize } = connection;
const { UUID, UUIDV4 } = Sequelize;

const DishIngredients = connection.define('dish_ingredients', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  dishId: {
    type: UUID,
    allowNull: false
  },
  ingredientId: {
    type: UUID,
    allowNull: false
  }
});

module.exports = DishIngredients;
