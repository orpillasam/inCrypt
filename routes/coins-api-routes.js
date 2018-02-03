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

    app.get("/api/coins/:coin", (req, res) =>{
     
        console.log("db of coins is " + db.Coins);
        db.Coins.findAll({
            where: {
                coin: req.params.coin
            }
        }).then ((dbCoinPage) => {
            res.json(dbCoinPage);
            console.log("holla db of coin is " + dbCoinPage);
        });
    });
};