const sql = require('mssql')

const config = {
    user: 'testuser',
    password: 'pedro123',
    server: 'localhost',
    database: 'test',
}

sql.connect(config, (err) => {
    if (err) {
        console.log(err)
    }
    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query('SELECT DB_NAME() AS [Database]', function (err, result) {

        if (err) console.log(err)

        // send records as a response
        console.log(result.recordsets[0][0], ' is connected')

    });
})

module.exports = config