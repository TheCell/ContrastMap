var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');

app.get('/', function (req, res)
{
    res.sendFile(path.join(__dirname, "index.html"))
});

app.use('/dist', express.static('dist'))
http.listen(process.env.PORT || 8080, function()
{
    console.log(`listening on *: ${http.address().port}`);
});