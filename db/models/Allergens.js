const connection = require('../connection');
const { Sequelize } = connection;
const { UUID, UUIDV4, STRING, TEXT } = Sequelize;

const Allergens = connection.define('allergens', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING,
        allowNull: false
    },
    description: {
        type: TEXT,
    }
});

Allergens.associate = (models) => {
    Allergens.belongsToMany(models.Users, {
        through: 'user_allergens'
    })
    Allergens.hasMany(models.Ingredients)
}

module.exports = Allergens;
