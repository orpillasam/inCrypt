$(document).ready( function() {


    getCoinQuantity();



    //function to get coin total value from database
    function getCoinQuantity() {
    console.log("checking if getCoins works");
        $.get("/api/coins", function(data){

            //BTC, LTC, ETH, BCH quantity array
            let coinQuantityArray = [];
            for (let m = 0; m <data.length; m++){
                CoinQuantityArray.push(data[m].total_quantity);

                //passes the quantites into the getCoinAPI
                getCoinAPI(coinQuantityArray[0], coinQuantityArray[1], coinQuantityArray[2], coinQuantityArray[3]);
            }
        });
    };


    getCoins();

/***********************Outside API Calls ******************************/
/***********************************************************************/

    //wait to have this called once we have the database information. Then uses the coin code to insert into the query
    function getCoinAPI(BTCQuantity, LTCQuantity, ETHQuantity, BCHQuantity) {


        let coinBTC = "BTC";
        let coinLTC = "LTC";
        let coinETH = "ETH";
        let coinBCH = "BCH";
        let conversionType = "USD";
        let time = moment().unix();
        let oneDayAgo = moment().subtract('hours', 24).unix();
        let oneWeekAgo = moment().subtract('days', 7).unix();
        let oneMonthAgo = moment().subtract('months', 1).unix();

        //query to get the current exchange rate of a coin, in a certain conversion type
        let queryURLBTCcurrent = "https://min-api.cryptocompare.com/data/price?fsym=" + coinBTC + "&tsyms=" + conversionType;
        let queryURLLTCCurrent = "https://min-api.cryptocompare.com/data/price?fsym=" + coinLTC + "&tsyms=" + conversionType;
        let queryURLETHCurrent = "https://min-api.cryptocompare.com/data/price?fsym=" + coinETH + "&tsyms=" + conversionType;
        let queryURLBCHCurrent = "https://min-api.cryptocompare.com/data/price?fsym=" + coinBCH + "&tsyms=" + conversionType;
        
        //query to get the exchange rate of a coin, in a certain conversion type, 24 hours ago from query date
        let queryURL2BTC24 = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinBTC + "&tsyms=" + conversionType + "&ts=" + oneDayAgo;
        let queryURL2LTC24 = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinLTC + "&tsyms=" + conversionType + "&ts=" + oneDayAgo;
        let queryURL2ETH24 = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinETH + "&tsyms=" + conversionType + "&ts=" + oneDayAgo;
        let queryURL2BCH24 = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinBCH + "&tsyms=" + conversionType + "&ts=" + oneDayAgo;
        
        //query to get the exchange rate of a coin, in a certain conversion type, one week ago from query date
        let queryURL3BTCWeek = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinBTC + "&tsyms=" + conversionType + "&ts=" + oneWeekAgo;
        let queryURL3LTCWeek = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinLTC + "&tsyms=" + conversionType + "&ts=" + oneWeekAgo;
        let queryURL3ETHWeek = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinETH + "&tsyms=" + conversionType + "&ts=" + oneWeekAgo;
        let queryURL3BCHWeek = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinBCH + "&tsyms=" + conversionType + "&ts=" + oneWeekAgo;
        
        //query to get the exchange rate of a coin, in a certain conversion type, one month ago from query date
        let queryURL4BTCMonth = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coin + "&tsyms=" + conversionType + "&ts=" + oneMonthAgo;
        let queryURL4LTCMonth = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coin + "&tsyms=" + conversionType + "&ts=" + oneMonthAgo;
        let queryURL4ETHMonth = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coin + "&tsyms=" + conversionType + "&ts=" + oneMonthAgo;
        let queryURL4ECHMonth = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coin + "&tsyms=" + conversionType + "&ts=" + oneMonthAgo;


        //***************************current price queries****************************//


        //BTC 
        $.ajax({
            url: queryURLBTCcurrent,
            method: "GET"
        }).done(function(response){
            let currentPriceBTC = response["USD"]
            console.log("BTC Current Price: " + currentPriceBTC);
            dayChangePercent(currentPriceBTC);

        });

        //LTC
        $.ajax({
            url: queryURLLTCCurrent,
            method: "GET"
        }).done(function(response){
            let currentPriceLTC = response["USD"]
            console.log("LTC Current Price: " + currentPriceLTC);
            dayChangePercent(currentPriceLTC);
        });

        //ETH
        $.ajax({
            url: queryURLETHCurrent,
            method: "GET"
        }).done(function(response){
            let currentPriceETH = response["USD"]
            console.log("ETH Current Price: " + currentPriceETH);
            dayChangePercent(currentPriceETH);
        });

        //BCH
        $.ajax({
            url: queryURLBCHCurrent,
            method: "GET"
        }).done(function(response){
            let currentPriceBCH = response["USD"]
            console.log("BCH Current Price: " + currentPriceBCH);
            dayChangePercent(currentPriceBCH);
        });       


        //***************************24 price queries****************************//

        //BTC
        $.ajax({
            url: queryURL2BTC24,
            method: "GET"
        }).done(function(response){
            let oneDayBTC = response["BTC"]["USD"]
            console.log("BTC Price 24 hrs Ago: " + oneDayBTC);
        });

        //LTC
         $.ajax({
            url: queryURL2LTC24,
            method: "GET"
        }).done(function(response){
            let oneDayLTC = response["BTC"]["USD"]
            console.log("LTC Price 24 hrs Ago: " + oneDayLTC);
        });

        //ETH
        $.ajax({
            url: queryURL2ETH24,
            method: "GET"
        }).done(function(response){
            let oneDayETH = response["BTC"]["USD"]
            console.log("ETH Price 24 hrs Ago: " + oneDayETH);
        });

        //BCH
        $.ajax({
            url: queryURL2BCH24,
            method: "GET"
        }).done(function(response){
            let oneDayBCH = response["BTC"]["USD"]
            console.log("BCH Price 24 hrs Ago: " + oneDayBCH);
        });       

        //***************************week price queries****************************//
        // $.ajax({
        //     url: queryURL3,
        //     method: "GET"
        // }).done(function(response){
        //     let oneWeek = response["BTC"]["USD"]
        //     console.log("Price 1 Week Ago: " + oneWeek);
        // });
        


        //***************************month price queries****************************//
        //BTC
        $.ajax({
            url: queryURL4BTCMonth,
            method: "GET"
        }).done(function(response){
            let oneMonthBTC = response["BTC"]["USD"]
            console.log("BTC Price 1 Month Ago: " + oneMonthBTC);
        });
      
        //LTC
        $.ajax({
            url: queryURL4LTCMonth,
            method: "GET"
        }).done(function(response){
            let oneMonthLTC = response["LTC"]["USD"]
            console.log("LTC Price 1 Month Ago: " + oneMonthLTC);
        });

        //ETH
        $.ajax({
            url: queryURL4ETHMonth,
            method: "GET"
        }).done(function(response){
            let oneMonthETH = response["ETH"]["USD"]
            console.log("ETH Price 1 Month Ago: " + oneMonthETH);
        });

        //BCH
        $.ajax({
            url: queryURL4BTCMonth,
            method: "GET"
        }).done(function(response){
            let oneMonthBCH = response["BCH"]["USD"]
            console.log("BCH Price 1 Month Ago: " + oneMonthBCH);
        });  

    };


        // currentPriceBTC, currentPriceLTC, currentPriceETH, currentPriceBCH
        // oneMonthBTC, oneMonthLTC, oneMonthETH, oneMonthBCH
        // BTCQuantity, LTCQuantity, ETHQuantity, BCHQuantity

        let walletTotal = ((currentPriceBTC * BTCQuantity) + (currentPriceLTC * LTCQuantity) + (currentPriceETH + ETHQuantity) + (currentPriceBCH + BCHQuantity));
        $("#usd-wallet").text("$" + walletTotal);

        let walletDayTotal = ((oneDayBTC * BTCQuantity) + (oneDayLTC * LTCQuantity) + (oneDayETH + ETHQuantity) + (oneDayBCH + BCHQuantity));

        let walletMonthTotal = ((oneMonthBTC * BTCQuantity) + (oneMonthLTC * LTCQuantity) + (oneMonthTH + ETHQuantity) + (oneMonthBCH + BCHQuantity));

        let walletTotalBTC = (walletTotal / currentPriceBTC);
        $("#btc-wallet").text("$" + walletTotalBTC);

        let walletDayChange = walletTotal - walletDayTotal;
        $("#24dollar-wallet").text("$" + walletDayChange);

        let walletDayPercentChange = ((walletDayChange / walletTotal) * 100).toFixed(2);
        $("#24percent-wallet").text(walletDayPercentChange + "%")

        let walletMonthChange = walletTotal - walletMonthTotal;
        $("#month-dollar-wallet").text("$" + walletDayChange);

        let walletMonthPercentChange = ((walletMonthChange / walletTotal) *100).toFixed(2);
        $("#month-percent-wallet").text(walletMonthPercentChange + "%");



        getCoins(currentPriceBTC, currentPriceLTC, currentPriceETH, currentPriceBCH);

        changeCoin(currentPriceBTC);
        changeCoin(currentPriceLTC);
        changeCoin(currentPriceETC);
        changeCoin(currentPriceBCH);





});

    // This function inserts a new  into our database and then updates the view
    function changeCoin(event) {
        // event.preventDefault();
        
        console.log("coin input is " + coinInput.val().trim());
        let coinSymbol = coinConversion[coinInput.val().trim()];
        console.log("coin symbol is " + coinSymbol);
        let coin = {


                coin: coinInput.val().trim(),
                coin_symbol: coinSymbol,
                trade_type: tradeInput.val().trim(),
                exchange_type: exchangeInput.val().trim(),
                trade_quantity: quantityInput.val().trim(),
                trade_price: priceInput.val().trim(),
                trade_date: dateInput.val().trim()
        };
        
        console.log("checking if insertTrade works. Trade is " + trade);
        $.post("/api/trades", trade);
        // $newItemInput.val("");

    };
