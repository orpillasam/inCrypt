const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");

const app = express();
const PORT = process.env.PORT || 8080;

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


db.sequelize.sync().then(function(){
	app.listen(PORT, function() {
		console.log("App listening on PORT " + PORT);
	});
});


