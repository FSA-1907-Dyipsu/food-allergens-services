const router = require('express').Router()
const {Allergens, Ingredients, Users, Restaurants, DishIngredients, Dishes} = require('../db/index').models

//get all allergens
router.get('/', (req, res, next) => {
  Allergens.findAll()
    .then(allergens => res.send(allergens))
    .catch(next)
});

router.get('/:dishId',  async (req,res,next) => {
  const allergens = (await Allergens.findAll()).reduce((allergensMap, curr) => {
    allergensMap[curr.id] = curr.name
    return allergensMap
  }, {})
  // console.log('allergens retreived->', allergens)
  const ingredientsRaw = (await DishIngredients.findAll({
    where:{
      dishId: req.params.dishId}
    }))
    // console.log('raw ing->', ingredientsRaw)
  const ingredients = (await Promise.all(ingredientsRaw.map(el =>  Ingredients.findByPk(el.ingredientId)
  ))).reduce((allergensMap, curr) => {
    const allergenName = allergens[curr.allergenId]
    // console.log('allergen id from reduce:', allergenName)
    if (allergenName) allergensMap.push(allergenName)
    return allergensMap
  }, [])
    // console.log('mapped ing->', ingredients)
  res.send(ingredientsRaw)
})

module.exports = router