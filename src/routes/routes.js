const express = require('express')
const router = express.Router()
const users = require('../queries/users')


//-------------ROUTES-------------------
router.get('/', function (req, res, next) {
    res.render('index', {
        title: "Home",
        userData: req.user
    });
});
//----------------------------------------------
//----------------API---------------------------
router.get('/api/getAsegurados', users.obtenerAsegurados)
router.get('/api/getAsegurado/:id', users.obtenerUnAsegurado)

module.exports = router