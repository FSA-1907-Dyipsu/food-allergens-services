const Users = require('./Users');
const UserAllergens = require('./UserAllergens');
const Allergens = require('./Allergens');
const Ingredients = require('./Ingredients');
const DishIngredients = require('./DishIngredients');
const Dishes = require('./Dishes');
const Restaurants = require('./Restaurants');
const Addresses = require('./Addresses');
const Reviews = require('./Reviews');

const models = {
    Users,
    UserAllergens,
    Allergens,
    Ingredients,
    DishIngredients,
    Dishes,
    Restaurants,
    Addresses,
    Reviews
};

Users.associate(models)
Allergens.associate(models)
Ingredients.associate(models)
Dishes.associate(models)
Restaurants.associate(models)
Addresses.associate(models)
Reviews.associate(models)

module.exports = models;
