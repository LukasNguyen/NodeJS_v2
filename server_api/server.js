var express = require('express');
var app = express();
var AWS = require("aws-sdk")
AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});
//Connect AWS Online
AWS.config.accessKeyId='AKIAJQUY3SIUEXPQPJTQ'
AWS.config.secretAccessKey='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'

app.listen(3000,function () {
    console.log("Server api is listening .....");
});


app.get('/getMoviesByYear/:year', function(req, res){

    var yearQuery = req.params.year;


    var docClient = new AWS.DynamoDB.DocumentClient();

    console.log("Querying for movies from 1985.");


    var params = {
        TableName: "Movies",
        KeyConditionExpression: "#yr = :yyyy",
        ExpressionAttributeNames: {
            "#yr": "year"
        },
        ExpressionAttributeValues: {
            ":yyyy": parseInt(yearQuery)
        }
    };

    docClient.query(params, function (err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            // data.Items.forEach(function (item) {
            //     res.json()
            // });
            res.json(data.Items)
        }
    });

});