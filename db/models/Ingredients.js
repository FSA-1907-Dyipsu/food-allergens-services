const connection = require('../connection');
const { Sequelize } = connection;
const { UUID, UUIDV4, STRING } = Sequelize;

const Ingredients = connection.define('ingredients', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING,
        allowNull: false,
        unique: true
    },
    allergenId: {
        type: UUID
    }
});

Ingredients.associate = (models) => {
    Ingredients.belongsTo(models.Allergens)
    Ingredients.belongsToMany(models.Dishes, {
        through: 'dish_ingredients'
    })
}

module.exports = Ingredients;
