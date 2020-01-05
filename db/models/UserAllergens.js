const connection = require('../connection');
const { Sequelize } = connection;
const { UUID, UUIDV4 } = Sequelize;

const UserAllergens = connection.define('user_allergens', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  userId: {
    type: UUID,
    allowNull: false
  },
  allergenId: {
    type: UUID,
    allowNull: false
  }
});

module.exports = UserAllergens;
