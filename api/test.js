const router = require('express').Router();

router.get('/', (req, res) => {
    res.send({ greeting: 'Hello From Sample Express Route' });
});

module.exports = router;
