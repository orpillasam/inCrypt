module.exports = function(sequelize, DataTypes){
    let Trades = sequelize.define("Trades", {
    	
       coin: DataTypes.STRING,
       coin_symbol: DataTypes.STRING,
       trade_type: DataTypes.STRING,
       exchange_type: DataTypes.STRING,
       trade_quantity: DataTypes.INTEGER,
       trade_price: DataTypes.DECIMAL,
       trade_date: DataTypes.DATE
    }, {
        timestamp: false
    });
    console.log("model Coins is " + Trades);
    return Trades;

}