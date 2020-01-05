const connection = require('../connection');
const { Sequelize } = connection;
const { UUID, UUIDV4, STRING } = Sequelize;

const Users = connection.define('users', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  googleId: {
    type: STRING,
    unique: true
  }
});

Users.associate = (models) => {
  Users.belongsToMany(models.Allergens, {
    through: 'user_allergens'
  })
  Users.hasMany(models.Reviews)
}

module.exports = Users;
