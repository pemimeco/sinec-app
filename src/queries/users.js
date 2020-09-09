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


module.exports = {
    obtenerAsegurados,
    obtenerUnAsegurado
}