var express = require('express');
var request = require('request');
var app = express();
var http = require('http');
var url =require('url');


var AWS = require("aws-sdk")
AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});
//Connect AWS Online
AWS.config.accessKeyId='AKIAIRHYFPWO3PHNUMRQ'
AWS.config.secretAccessKey='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'
var docClient = new AWS.DynamoDB.DocumentClient();

app.use('/css',express.static( 'public/css'));
app.listen(9999,function () {
    console.log("Server client is listening .....");
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/html/index.html');
});

app.get('/loadItem', function(req, res){
    res.sendFile(__dirname + '/public/html/loadItem.html');
});

app.get('/loadItemValue/', function(req, res){

    var yearQuery = req.query.year;

    request.get({ url: "http://localhost:3000/getMoviesByYear/" +yearQuery },function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var result = JSON.parse(body);

            var s = "<table ><th>Tiêu đề phim</th><th>Năm</th>";

            result.forEach(function (data) {
                s+="<tr>";
                s+="<td>"+data.title+"</td>";
                s+="<td>"+data.year+"</td>";
                s+="</tr>";
            })
            s+="</table>"

            res.send(s);
        }
    });
});
