var express = require('express');
var app = express();

//设置跨域方便开发
app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

//具体接口设置
app.get('/api/init', function(req, res) {
	res.send({ code: 200, data: {
			isPicking: false,
			newAppleId: 4,
			apples: [
				{
					id: 1,
					weight: 235,
					isEaten: false
				},
				{
					id: 2,
					weight: 256,
					isEaten: false
				},
				{
					id: 3,
					weight: 176,
					isEaten: false
				}
			]
		}
	});
});

app.get('/api/getMore', function(req, res){
	res.send({code: 200, data: {
		id: -1,
		weight: 500,
		isEaten: false
	}})
});

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Mock Server listening at http://%s:%s', host, port);
});