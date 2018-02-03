module.exports = function(sequelize, DataTypes){
   
    let Coins = sequelize.define("Coins", {
        
       coin: DataTypes.STRING,
       coin_symbol: DataTypes.STRING,
       total_quantity: DataTypes.INTEGER,
       coin_value: DataTypes.DECIMAL
    }, {
        timestamps: false
    
    });
    console.log("model Coins is " + Coins);
    return Coins;
    

}