const express = require('express')
const router = express.Router()
const sql = require('mssql')
const sqlConfig = require('../database')
const users = require('../queries/users');


//-------------ROUTES-------------------
router.get('/buscarAsegurado', (req, res, next) => {
    res.render('index');
});
router.post('/buscarAsegurado', async (req, res, next) => {
    // console.log(req.body.edtBuscar)
    if (req.body.edtBuscar == '') {
        res.render('index', {
            message: 'Ingrese un id valido'
        });
    }
    await sql.connect(sqlConfig, (err) => {
        if (err) {
            console.log(err)
        }
        var request = new sql.Request();
        request.query(`select * from asegurados2 where cod = '${req.body.edtBuscar}'`, (err, result) => {
            if (err) {
                console.log(err)
            }
            const response = result.recordset[0]
            res.render('index', {
                message: 'Usuario Obtenido',
                id: req.body.edtBuscar,
                nombre: response.name,
                apellido: response.name,
                empresa: 'test',
                fec_ing: 'test',
                matricula: 'test',
                fec_nac: 'test'

            })
            console.log(result.recordset)
        });
    })

});
//----------------------------------------------
//----------------API---------------------------
router.get('/api/getAsegurados', users.obtenerAsegurados)
router.get('/api/getAsegurado/:id', users.obtenerUnAsegurado)

module.exports = router