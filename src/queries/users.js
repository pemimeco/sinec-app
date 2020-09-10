const express = require('express')
const router = express.Router()
const sql = require('mssql')
const sqlConfig = require('../database')


async function obtenerAsegurados(req, res, next) {
    await sql.connect(sqlConfig, (err) => {
        if (err) {
            console.log(err)
        }
        var request = new sql.Request();
        request.query(`select * from asegurados2`, (err, result) => {
            if (err) {
                console.log(err)
            }
            res.json(result.recordsets)

        });
    })
}

async function obtenerUnAsegurado(req, res, next) {
    let params = req.params
    await sql.connect(sqlConfig, (err) => {
        if (err) {
            console.log(err)
        }
        var request = new sql.Request();
        request.query(`select * from asegurados2 where cod = '${params.id}'`, (err, result) => {
            if (err) {
                console.log(err)
            }
            res.json(result.recordset)

        });
    })
}

async function obtenerInfoAsegurado(req, res, next) {
    if (req.body.btnBuscar != undefined) { //click en buscar
        await renderDatos(req, res, next)
    }
    if (req.body.btnRegistrar != undefined) { //click en registrar
        await sql.connect(sqlConfig, (err) => {
            if (err) {
                console.log(err)
            }
            var request = new sql.Request();
            request.query(`update asegurados2 set tipo_sangre = '${req.body.tipo_sangre}' where cod = '${req.body.edtBuscar}'`, (err, result) => {
                if (err) {
                    console.log(err)
                }
                const response = result.rowsAffected[0]
                if (response > 0) {
                    renderDatos(req, res, next) //cargo los datos de nuevo
                } else {
                    renderDatos(req, res, next) //cargo los datos de nuevo
                }
                console.log(response)
            });
        })
    }
}

async function renderDatos(req, res, next) {
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
            console.log(response)
            if (response == undefined) { // no existe el codigo del usuario
                res.render('index', {
                    message: 'Usuario no encontrado',
                    id: req.body.edtBuscar
                })
            }
            if (response != undefined) {
                res.render('index', {
                    message: 'Usuario Obtenido',
                    id: req.body.edtBuscar,
                    nombre: response.name,
                    apellido: response.name,
                    empresa: 'test',
                    fec_ing: 'test',
                    matricula: 'test',
                    fec_nac: 'test',
                    tipo_sangre: response.tipo_sangre

                })
            }

        });
    })
}

module.exports = {
    obtenerAsegurados,
    obtenerUnAsegurado,
    obtenerInfoAsegurado
}