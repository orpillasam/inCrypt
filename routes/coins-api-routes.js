const db = require("../models");

module.exports = (app) => {

    app.get("/api/coins", (req, res) =>{
     
        console.log("db of coins is " + db.Coins);
        db.Coins.findAll({
            // include: [db.Trades]
        }).then ((dbCoin) => {
            res.json(dbCoin);
            console.log("db of coin is " + dbCoin);
        });
    });

    app.put("/api/coins", (req, res) =>{
     
        console.log("db of coins is " + db.Coins);
        // consol.log("reqparamcoins is " + req.params)
        db.Coins.update({

            total_quantity: req.body.total_quantity,
            coin_symbol: req.body.coin_symbol,
            coin_value: req.body.coin_value
        }, {
            where: {
                coin: req.body.coin
            }
        }).then ((dbCoinPage) => {
            res.json(dbCoinPage);
            console.log("holla db of coin is " + dbCoinPage);
        });
    });
};