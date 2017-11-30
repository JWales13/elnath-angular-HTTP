var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

router.get('/', function(req,res){
    pool.connect(function(err, client, done){
        if(err){
            console.log('error', err);
            res.sendStatus(500);
        }
        else{
            client.query('SELECT * FROM food', function(err, result){
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

router.post('/', function(req,res){
    pool.connect(function(errorConnectingToDatabase, client, done){
        if (errorConnectingToDatabase) {
            console.log('error connecting to DB', errorConnectingToDatabase);
            res.sendStatus(500);
        }
        else {

            client.query(`INSERT INTO food ("name", "deliciousness_rating", "is_hot")
            VALUES ($1, $2, $3);`,[req.body.name, req.body.deliciousness_rating, req.body.is_hot], function(errorMakingQuery, result){
                done();
                if (errorMakingQuery) {
                    console.log('error making query', errorMakingQuery);
                    res.sendStatus(500);
                }
                else {
                    res.sendStatus(201); 
                }//end  query else
            });//end client query
        }//end connect else
    });//end pool connect
  })//end app post

  router.delete('/:id', function (req, res) {
    var foodIdToRemove = req.params.id;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`DELETE FROM food WHERE id=$1;`, [foodIdToRemove], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
});


router.put('/:id', function (req, res) {
    var foodIdToChange = req.params.id;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`UPDATE food
            SET is_hot = NOT is_hot
            WHERE "id"=$1;`, [foodIdToChange], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
});











module.exports = router;