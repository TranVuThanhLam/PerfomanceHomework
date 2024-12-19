var express = require('express');
var app = express();

app.get('/', function (req, res) {
    var sql = require("mssql");
    // config for your database
    var config = {
        user: 'lam',
        password: 'lamlam',
        server: 'localhost', 
        database: 'perfomance',
        options: {
            // ... các tùy chọn khác
            trustServerCertificate: true // BỎ QUA KIỂM TRA CHỨNG CHỈ (KHÔNG AN TOÀN CHO PRODUCTION)
        }
    };
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('SELECT TOP 100 ID, Title, Content, Description from news', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});