const connection = require('../connection');
const { Sequelize } = connection;
const { UUID, UUIDV4, STRING, TEXT } = Sequelize;

const Restaurants = connection.define('restaurants', {
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
        type: TEXT
    },
    phoneNumber: {
        type: STRING
    },
    imageUrl: {
        type: STRING
    }
});

Restaurants.associate = (models) => {
    Restaurants.hasMany(models.Reviews)
    Restaurants.hasMany(models.Dishes)
    Restaurants.hasOne(models.Addresses)
}

module.exports = Restaurants;
