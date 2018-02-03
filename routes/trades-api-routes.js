const db = require("../models");

module.exports = (app) => {

		//gets all trades for a particular coin
		app.get("/api/trades/:coin", (req, res) =>{
	 
	    console.log("db of this coin trades is " + db.Trades);
	    db.Trades.findAll({
				where: {
					coin: req.params.coin
				}
	    }).then ((dbTradeCoin) => {
	        res.json(dbTradeCoin);
	        console.log("hella db of this coin is " + dbTradeCoin);
	    });
    });

	//gets all trades for all coins
	// app.get("/api/trades", (req, res) =>{
	 
	//     console.log("db of trades is " + db.Trades);
	//     db.Trades.findAll({
	//         // include: [db.Trades]
	//     }).then ((dbTrade) => {
	//         res.json(dbTrade);
	//         console.log("db of coin is " + dbTrade);
	//     });
  //   });

	//adds a trade that was created by the client to the table "trades" of cryptos_db
  	app.post("/api/trades", function(req, res) {

	    db.Trades.create({
			coin: req.body.coin,
			coin_symbol: req.body.coin_symbol,
			trade_type: req.body.trade_type,
			exchange_type: req.body.exchange_type,
	    	trade_quantity: req.body.trade_quantity,
	    	trade_price: req.body.trade_price,
	    	trade_date: req.body.trade_date	
	    }).then(function(dbTrade) {
				res.json(dbTrade);
				updateCoin();
			});

	 });

  	//deletes a trade by client from the table "trades" of cryptos_db
  	//not linked yet****************************************************************
	app.delete("/api/trades/:id", function(req, res) {
		db.Trades.destroy({
		  where: {
		    id: req.params.id
		  }
		}).then(function(dbTrade) {
		  res.json(dbTrade);
		});

	});

	//updates a trade by the client, from the table "trades" of cryptos_db
	//not linked yet**************************************************************
	app.put("/api/trades", function(req, res) {

		db.Trades.update({
			coin: req.body.coin,
			coin_symbol: req.body.coin_symbol,
			trade_type: req.body.trade_type,
			exchange_type: req.body.exchange_type,
	    	trade_quantity: req.body.trade_quantity,
	    	trade_price: req.body.trade_price,
	    	trade_date: req.body.trade_date	
		}, {
		  where: {
		    id: req.body.id
		  }
		}).then(function(dbTodo) {
		  res.json(dbTodo);
		});
	});

	function updateCoin() {
		app.put("/api/coins", function(req, res) {
			db.Coins.update({
				total_quantity: req.body.total_quantity,
				coin_value: req.body.coin_value
			}, {
				where: {
					coin: req.body.coin,
					coin_symbol: req.body.coin_symbol
				}
			}).then(function(dbCoinUpdate){
				res.json(dbCoinUpdate)
				console.log("is this update coin working?")
			})
		});
	}
}