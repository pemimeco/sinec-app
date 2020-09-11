const express = require('express')
const router = express.Router()
const sql = require('mssql')
const sqlConfig = require('../database')
const users = require('../queries/users');


//-------------ROUTES-------------------
router.get('/', (req, res, next) => {
    res.render('menu');
});
router.get('/buscarAsegurado', (req, res, next) => {
    res.render('index', {
        menu_active: 'active'
    });
});
router.get('/test', (req, res, next) => {
    res.render('test', {
        menu_active2: 'active'
    });
});
router.post('/buscarAsegurado', users.obtenerInfoAsegurado);

// router.post('/registrarTipoSangre', );
//----------------------------------------------
//----------------API---------------------------
router.get('/api/getAsegurados', users.obtenerAsegurados)
router.get('/api/getAsegurado/:id', users.obtenerUnAsegurado)

module.exports = router