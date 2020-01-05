const connection = require('../connection');
const { Sequelize } = connection;
const { UUID, UUIDV4, TIME, ENUM } = Sequelize;

const BusinessHours = connection.define('business_hours', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    day: {
        type: ENUM('MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT', 'SUN')
    },
    timeOpen: {
        type: TIME
    },
    timeClose: {
        type: TIME
    }
});

BusinessHours.associate = (models) => {
    BusinessHours.belongsTo(models.Restaurants)
}

module.exports = BusinessHours;
