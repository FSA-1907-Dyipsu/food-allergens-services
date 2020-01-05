const connection = require('../connection');
const { Sequelize } = connection;
const { UUID, UUIDV4, STRING, INTEGER, TEXT } = Sequelize;

const Reviews = connection.define('reviews', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    rating: {
        type: INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 }
    },
    title: {
        type: STRING,
    },
    description: {
        type: TEXT,
    },
    userId: {
        type: UUID,
        allowNull: false
    },
    restaurantId: {
        type: UUID,
        allowNull: false
    }
});

Reviews.associate = (models) => {
    Reviews.belongsTo(models.Users)
    Reviews.belongsTo(models.Restaurants)
}

module.exports = Reviews;
