const express = require('express')
const router = express.Router()
const sql = require('mssql')
const sqlConfig = require('../database')
const users = require('../queries/users');


//-------------ROUTES-------------------
router.get('/buscarAsegurado', (req, res, next) => {
    res.render('index');
});
router.post('/buscarAsegurado', users.obtenerInfoAsegurado);

// router.post('/registrarTipoSangre', );
//----------------------------------------------
//----------------API---------------------------
router.get('/api/getAsegurados', users.obtenerAsegurados)
router.get('/api/getAsegurado/:id', users.obtenerUnAsegurado)

module.exports = router