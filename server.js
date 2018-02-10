const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");
const Highcharts = require('highcharts/highstock');

const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 8081;

const db = require("./models");

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(express.static("public"));

// const exphbs = require("express-handlebars");

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");


require("./routes/html-routes.js")(app);
require("./routes/coins-api-routes.js")(app);
require("./routes/trades-api-routes.js")(app);

io.on('connection', function (socket) {
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
	  console.log(data);
	});
  });

db.sequelize.sync().then(function(){
	server.listen(PORT, function() {
		console.log("App listening on PORT " + PORT);
	});
});


