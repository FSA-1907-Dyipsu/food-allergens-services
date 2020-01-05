const fs = require('fs');
const path = require('path');
const models = require('../models');
const { Users, Allergens, Ingredients, Restaurants, Addresses, Dishes } = models;

const DATA_FOLDER = path.resolve('./db/seeds/data');
const SEED_FILES = [
  { model: Users, file: 'Users.json' },
  { model: Allergens, file: 'Allergens.json' },
  { model: Restaurants, file: 'Restaurants.json' }
];

const getSeedFileData = file => {
  return new Promise((res, rej) => {
    fs.readFile(path.join(DATA_FOLDER, file), 'utf8', (err, jsonString) => {
      return err ? rej(err) : res(JSON.parse(jsonString))
    });
  })
};

const createModelData = (list, Model) => {
  return Promise.all(list.map(el => Model.create(el)));
};

const createAllergenData = async (allergens) => {
  for (let { name, description, ingredients } of allergens) {
    const allergen = await Allergens.create({
      name,
      description
    })
    for (let ingredient of ingredients) {
      let existingIngredient = await Ingredients.findOne({
        where: {
          name: ingredient
        }
      })
      if (!existingIngredient) {
        existingIngredient = await Ingredients.create({
          name: ingredient,
          allergenId: allergen.id
        })
      }
    }
  }
}

const createIngredientData = async (dishIngredients) => {
  const restoIdMemo = {}
  for (let { restaurantName, dishName, ingredients } of dishIngredients) {
    if (!restoIdMemo[restaurantName]) {
      restoIdMemo[restaurantName] = (await Restaurants.findOne({
        where: {
          name: restaurantName
        }
      })).id
    }
    const existingDish = await Dishes.findOne({
      where: {
        name: dishName,
        restaurantId: restoIdMemo[restaurantName]
      }
    })

    for (let ingredient of ingredients) {
      let existingIngredient = await Ingredients.findOne({
        where: {
          name: ingredient
        }
      })
      if (!existingIngredient) {
        existingIngredient = await Ingredients.create({
          name: ingredient
        })
      }
      
      await existingDish.addIngredient(existingIngredient)
    }
  }
}

const createRestaurantData = async (restaurants) => {
  for (let restaurant of restaurants) {
    const resto = await Restaurants.create({
      name: restaurant.name,
      description: restaurant.description,
      phoneNumber: restaurant.phoneNumber,
      imageUrl: restaurant.imageUrl
    })
    const { address, dishes } = restaurant
    await Addresses.create({ ...address, restaurantId: resto.id })
    await Promise.all(dishes.map(dish => Dishes.create({ ...dish, restaurantId: resto.id })))
  }
  await createIngredientData(await getSeedFileData('Ingredients.json'));
}

const seeder = () => {
  SEED_FILES.forEach(async ({ model, file }) => {
    const seedData = await getSeedFileData(file);
    switch (file) {
      case 'Restaurants.json': {
        await createRestaurantData(seedData);
        break;
      }
      case 'Allergens.json': {
        await createAllergenData(seedData);
        break;
      }
      default:
        await createModelData(seedData, model);
    }
    // console.log(`\nLoaded data from ${file}: \n${JSON.stringify(seedData)}...\n`);
  });
};

module.exports = seeder;
