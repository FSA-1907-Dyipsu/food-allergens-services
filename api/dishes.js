const router = require('express').Router()
const {Dishes, Ingredients, Allergens } = require('../db/index').models

router.get('/:id', (req,res,next) =>{
  Dishes.findAll({
    include: [{model:Ingredients, include:[Allergens]}],
    where:{
    restaurantId: req.params.id
    }
}).then(resto=>res.send(resto))
})

module.exports = router