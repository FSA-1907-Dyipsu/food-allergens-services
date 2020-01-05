// const router = require('express').Router()
// const {Reviews, Users} = ('../db/index').models

// // router.post('/:id', async (req,res,next) => {
// //   const user = await Users.findByPk(req.params.id)
// //   if(user){
// //     Reviews.create(req.body)
// //       .then(() => res.status(201))
// //       .catch(next)
// //   }
// // })

// // router.get('/:id', (req,res,next) => {
// //   Reviews.findAll({where:{userId:req.params.id}})
// //   .then(reviews => res.send(reviews))
// //   .catch(next)
// // })

// // router.get('/restaurant/:id', (req, res, next) => {
// //   Reviews.findAll({where:{restaurantId:id}})
// //     .then(reviews => res.send(reviews))
// //     .catch(next)
// // })
// module.exports = router 