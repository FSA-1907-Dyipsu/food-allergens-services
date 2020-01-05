const router = require('express').Router()
const passport = require('passport')
require('../config/passport')

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect(process.env.WEB_SERVER)
})

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect(process.env.WEB_SERVER)
})

module.exports = router
