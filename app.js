const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { resourceLimits } = require('worker_threads');
const { result } = require('lodash');
const { resolve } = require('path');
const app = express();
app.use('/public', express.static(path.join(__dirname,"static"))); //allias for static
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'static','login.html')); 
});

app.post('/',(req,res)=>{
    console.log(req.body);
    var name = req.body.username;
    var password = req.body.password;
    var mysql = require('mysql');
    var value = 0;
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "stonkify_testdb"
    });
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = `select * from user where username ="${name}" AND password = "${password}";`;
        con.query(sql, function (err, result) {
          if (err) throw err;
            var num = Object.keys(result);
            var value = num.length;
            console.log(value);
            if (value > 0){
                console.log('hello');
                res.redirect('public/Bregister.html'); 
            }else{
                res.redirect('public/login.html'); 
            }
        });
    });
}); 

app.listen(3000)