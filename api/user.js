const router = require('express').Router();
const {Users} = require('../db/index').models

//get user
router.get('/', (req, res) => {
  const { user } = req
  if (user) res.send(user)
  else res.status(404).send('User not found')
});

//get specific user
router.get('/:id', (req,res,next) => {
  Users.findByPk(req.params.id)
    .then(user => res.send(user))
    .catch(next)
})

//create user (if needed)
router.post('/create', (req,res,next) =>{
  Users.create(req.body)
    .then(user=> res.send(user))
    .then(() => res.status(201))
    .catch(next)
})

//update user (if needed)
router.put('/update', (req,res,next) =>{ 
  Users.findByPk(req.params.id)
    .then(user => user.update(req.body))
    .then(user => res.send(user))
    .catch(next)
})

module.exports = router;
