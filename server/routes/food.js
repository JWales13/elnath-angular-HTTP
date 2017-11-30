var express = require('express');
var router = express.Router();
var pool = require('../modules/pool')

router.get('/', function(req,res){
    pool.connect(function(err, client, done){
        if(err){
            console.log('error', err);
            res.sendStatus(500);
        }
        else{
            client.query('SELECT * FROM food', function(err){
                if(err){
                    console.log('error', err)
                    res.sendStatus(500);
                }
                else{
                    res.send(result.rows);
                }
            })
        }
    })
})











module.exports = router;