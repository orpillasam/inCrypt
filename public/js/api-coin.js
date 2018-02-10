$(document).ready( function() {

    getCoinQuantity();

    //function to get coin total value from database
    function getCoinQuantity() {
    console.log("checking if getCoins works");
        $.get("/api/coins", function(data){
            console.log(data);
            //BTC, LTC, ETH, BCH quantity array
            let coinQuantityArray = [];
            for (let m = 0; m <data.length; m++){
                coinQuantityArray.push(data[m].total_quantity);
                console.log(coinQuantityArray);
            }
        //passes the quantites into the getCoinAPI
        getCoinAPI(coinQuantityArray[0], coinQuantityArray[1], coinQuantityArray[2], coinQuantityArray[3]);
        });
    };

    function makePosNeg() {
        var TDs = document.querySelectorAll('.plusmin');
        
        for (var i = 0; i < TDs.length; i++) {
          var temp = TDs[i];
          if (temp < 0) {temp.className = "negative";}
          else {temp.className = "positive";}
      }


/***********************Outside API Calls ******************************/
/***********************************************************************/

    //wait to have this called once we have the database information. Then uses the coin code to insert into the query
    function getCoinAPI(BTCQuantity, LTCQuantity, ETHQuantity, BCHQuantity) {

        let currentPriceBTC, currentPriceLTC, currentPriceETH, currentPriceBCH;
        let oneDayBTC, oneDayLTC, oneDayETH, oneDayBCH;
        let oneMonthBTC, oneMonthLTC, oneMonthETH, oneMonthBCH;
        let BTCAverage = 9324.21
        let LTCAverage = 137.50
        let ETHAverage = 854.66
        let BCHAverage = 2216.10
        let coinBTC = "BTC";
        let coinLTC = "LTC";
        let coinETH = "ETH";
        let coinBCH = "BCH";
        let conversionType = "USD";
        let time = moment().unix();
        let oneDayAgo = moment().subtract(24,'hours').unix();
        let oneWeekAgo = moment().subtract(7,'days').unix();
        let oneMonthAgo = moment().subtract(1,'months').unix();

        //query to get the current exchange rate of a coin, in a certain conversion type
        let queryURLBTCcurrent = "https://min-api.cryptocompare.com/data/price?fsym=" + coinBTC + "&tsyms=" + conversionType;
        let queryURLLTCCurrent = "https://min-api.cryptocompare.com/data/price?fsym=" + coinLTC + "&tsyms=" + conversionType;
        let queryURLETHCurrent = "https://min-api.cryptocompare.com/data/price?fsym=" + coinETH + "&tsyms=" + conversionType;
        let queryURLBCHCurrent = "https://min-api.cryptocompare.com/data/price?fsym=" + coinBCH + "&tsyms=" + conversionType;
        console.log(queryURLBTCcurrent);
        //query to get the exchange rate of a coin, in a certain conversion type, 24 hours ago from query date
        let queryURL2BTC24 = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinBTC + "&tsyms=" + conversionType + "&ts=" + oneDayAgo;
        let queryURL2LTC24 = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinLTC + "&tsyms=" + conversionType + "&ts=" + oneDayAgo;
        let queryURL2ETH24 = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinETH + "&tsyms=" + conversionType + "&ts=" + oneDayAgo;
        let queryURL2BCH24 = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinBCH + "&tsyms=" + conversionType + "&ts=" + oneDayAgo;
        
        // //query to get the exchange rate of a coin, in a certain conversion type, one week ago from query date
        // let queryURL3BTCWeek = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinBTC + "&tsyms=" + conversionType + "&ts=" + oneWeekAgo;
        // let queryURL3LTCWeek = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinLTC + "&tsyms=" + conversionType + "&ts=" + oneWeekAgo;
        // let queryURL3ETHWeek = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinETH + "&tsyms=" + conversionType + "&ts=" + oneWeekAgo;
        // let queryURL3BCHWeek = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinBCH + "&tsyms=" + conversionType + "&ts=" + oneWeekAgo;
        
        //query to get the exchange rate of a coin, in a certain conversion type, one month ago from query date
        let queryURL4BTCMonth = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinBTC + "&tsyms=" + conversionType + "&ts=" + oneMonthAgo;
        let queryURL4LTCMonth = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinLTC + "&tsyms=" + conversionType + "&ts=" + oneMonthAgo;
        let queryURL4ETHMonth = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinETH + "&tsyms=" + conversionType + "&ts=" + oneMonthAgo;
        let queryURL4BCHMonth = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinBCH + "&tsyms=" + conversionType + "&ts=" + oneMonthAgo;


        //***************************current price queries****************************//
        
        //BTC 
        $.ajax({
            url: queryURLBTCcurrent,
            method: "GET"
        }).done(function(response){
            console.log("url1 response is " + response);
            currentPriceBTC = response["USD"]
            // newCurrentPriceArray.push(currentPriceBTC);
            console.log("BTC Current Price: " + currentPriceBTC);
            // dayChangePercent(currentPriceBTC);

        });

        //LTC
        $.ajax({
            url: queryURLLTCCurrent,
            method: "GET"
        }).done(function(response){
            currentPriceLTC = response["USD"]
            console.log("LTC Current Price: " + currentPriceLTC);
            // newCurrentPriceArray.push(currentPriceLTC);
            // dayChangePercent(currentPriceLTC);
        });

        //ETH
        $.ajax({
            url: queryURLETHCurrent,
            method: "GET"
        }).done(function(response){
            currentPriceETH = response["USD"]
            console.log("ETH Current Price: " + currentPriceETH);
            // newCurrentPriceArray.push(currentPriceETH);
            // dayChangePercent(currentPriceETH);
        });

        //BCH
        $.ajax({
            url: queryURLBCHCurrent,
            method: "GET"
        }).done(function(response){
            currentPriceBCH = response["USD"]
            console.log("BCH Current Price: " + currentPriceBCH);
            // newCurrentPriceArray.push(currentPriceBCH);
            // dayChangePercent(currentPriceBCH);
        });       

        //***************************24 price queries****************************//

        //BTC
        $.ajax({
            url: queryURL2BTC24,
            method: "GET"
        }).done(function(response){
            oneDayBTC = response["BTC"]["USD"]
            // newDayPriceArray.push(oneDayBTC);
            console.log("BTC Price 24 hrs Ago: " + oneDayBTC);
        });

        //LTC
         $.ajax({
            url: queryURL2LTC24,
            method: "GET"
        }).done(function(response){
            oneDayLTC = response["LTC"]["USD"]
            // newDayPriceArray.push(oneDayLTC);
            console.log("LTC Price 24 hrs Ago: " + oneDayLTC);
        });

        //ETH
        $.ajax({
            url: queryURL2ETH24,
            method: "GET"
        }).done(function(response){
            oneDayETH = response["ETH"]["USD"]
            // newDayPriceArray.push(oneDayETH);
            console.log("ETH Price 24 hrs Ago: " + oneDayETH);
        });

        //BCH
        $.ajax({
            url: queryURL2BCH24,
            method: "GET"
        }).done(function(response){
            oneDayBCH = response["BCH"]["USD"]
            // newDayPriceArray.push(oneDayBCH);
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
            oneMonthBTC = response["BTC"]["USD"]
            console.log("BTC Price 1 Month Ago: " + oneMonthBTC);
        });
      
        //LTC
        $.ajax({
            url: queryURL4LTCMonth,
            method: "GET"
        }).done(function(response){
            oneMonthLTC = response["LTC"]["USD"]
            console.log("LTC Price 1 Month Ago: " + oneMonthLTC);
        });

        //ETH
        $.ajax({
            url: queryURL4ETHMonth,
            method: "GET"
        }).done(function(response){
            oneMonthETH = response["ETH"]["USD"]
            console.log("ETH Price 1 Month Ago: " + oneMonthETH);
        });

        //BCH
        $.ajax({
            url: queryURL4BCHMonth,
            method: "GET"
        }).done(function(response){
            oneMonthBCH = response["BCH"]["USD"]
            console.log("BCH Price 1 Month Ago: " + oneMonthBCH);
        });  

        setTimeout(function(){getWallet();}, 3000);
        setTimeout(function(){getCoinWallet();}, 3000);

        function getCoinWallet(){

            //****************bitcoin**********************//

            $("#bitcoin-type").text("Bitcoin");

            $("#bitcoin-qty").text(BTCQuantity);


            let BTCValue = (currentPriceBTC * BTCQuantity).toFixed(2);
            $("#bitcoin-value").text("$" + BTCValue);
            console.log("BTC value is " + BTCValue);

            // let BTCAverage = (BTCAverage * BTCQuantity).toFixed(2);
            $("#bitcoin-avg-cost").text("$" + BTCAverage)
            console.log("BTC average is " + BTCAverage)

            $("#bitcoin-cur-price").text("$" + currentPriceBTC);

            let BTCDayTotal = (oneDayBTC * BTCQuantity);
            console.log("BTC day total is " + BTCDayTotal);

            let BTCDayChange = (BTCValue - BTCDayTotal).toFixed(2);
            $("#bitcoin-24-dol").text("$" + BTCDayChange);
            console.log("btc day change is " + BTCDayChange);

            let BTCDayPercentChange = ((BTCDayChange / BTCValue) * 100).toFixed(2);
            $("#bitcoin-24-per").text (BTCDayPercentChange + "%");

            let BTCMonthTotal = (oneMonthBTC * BTCQuantity);
            console.log("BTC month total is " + BTCMonthTotal);

            let BTCMonthChange = (BTCValue - BTCMonthTotal).toFixed(2);
            $("#bitcoin-month-dol").text("$" + BTCMonthChange);
            console.log("btc month change is " + BTCMonthChange);

            let BTCMonthPercentChange = ((BTCMonthChange / BTCValue) * 100).toFixed(2);
            $("#bitcoin-month-per").text(BTCMonthPercentChange + "%");


            //*************************litecoin*******************//
            
            $("#litecoin-type").text("Litecoin");
            
            $("#litecoin-qty").text(LTCQuantity);

            let LTCValue = (currentPriceLTC * LTCQuantity).toFixed(2);
            $("#litecoin-value").text("$" + LTCValue);
            console.log("LTC value is " + LTCValue);

            // let LTCAverage = (currentPriceLTC / LTCQuantity).toFixed(2);
            $("#litecoin-avg-cost").text("$" + LTCAverage)
            console.log("LTC average is " + LTCAverage)

            $("#litecoin-cur-price").text("$" + currentPriceLTC);

            let LTCDayTotal = (oneDayLTC * LTCQuantity);
            console.log("LTC day total is " + LTCDayTotal);

            let LTCDayChange = (LTCValue - LTCDayTotal).toFixed(2);
            $("#litecoin-24-dol").text("$" + LTCDayChange);
            console.log("ltc day change is " + LTCDayChange);

            let LTCDayPercentChange = ((LTCDayChange / LTCValue) * 100).toFixed(2);
            $("#litecoin-24-per").text (LTCDayPercentChange + "%");

            let LTCMonthTotal = (oneMonthLTC * LTCQuantity);
            console.log("LTC month total is " + LTCMonthTotal);

            let LTCMonthChange = (LTCValue - LTCMonthTotal).toFixed(2);
            $("#litecoin-month-dol").text("$" + LTCMonthChange);
            console.log("Ltc month change is " + LTCMonthChange);

            let LTCMonthPercentChange = ((LTCMonthChange / LTCValue) * 100).toFixed(2);
            $("#litecoin-month-per").text(LTCMonthPercentChange + "%");


            //******************ethereum*********************//
            
            $("#ethereum-type").text("Ethereum");
            
            $("#ethereum-qty").text(ETHQuantity);

            let ETHValue = (currentPriceETH * ETHQuantity).toFixed(2);
            $("#ethereum-value").text("$" + ETHValue);
            console.log("ETH value is " + ETHValue);

            // let ETHAverage = (currentPriceETH / ETHQuantity).toFixed(2);
            $("#ethereum-avg-cost").text("$" + ETHAverage)
            console.log("ETH average is " + ETHAverage)

            $("#ethereum-cur-price").text("$" + currentPriceETH);

            let ETHDayTotal = (oneDayETH* ETHQuantity);
            console.log("ETH day total is " + ETHDayTotal);

            let ETHDayChange = (ETHValue - ETHDayTotal).toFixed(2);
            $("#ethereum-24-dol").text("$" + ETHDayChange);
            console.log("ETH day change is " + ETHDayChange);

            let ETHDayPercentChange = ((ETHDayChange / ETHValue) * 100).toFixed(2);
            $("#ethereum-24-per").text (ETHDayPercentChange + "%");

            let ETHMonthTotal = (oneMonthETH * ETHQuantity);
            console.log("ETH month total is " + ETHMonthTotal);

            let ETHMonthChange = (ETHValue - ETHMonthTotal).toFixed(2);
            $("#ethereum-month-dol").text("$" + ETHMonthChange);
            console.log("ETH month change is " + ETHMonthChange);

            let ETHMonthPercentChange = ((ETHMonthChange / ETHValue) * 100).toFixed(2);
            $("#ethereum-month-per").text(ETHMonthPercentChange + "%");

            //**********************bitcoin cash*********************//
            
            $("#bitcoin-cash-type").text("Bitcoin Cash");
            
            $("#bitcoin-cash-qty").text(BCHQuantity);

            let BCHValue = (currentPriceBCH * BCHQuantity).toFixed(2);
            $("#bitcoin-cash-value").text("$" + BCHValue);
            console.log("BCH value is " + BCHValue);

            // let BCHAverage = (currentPriceBCH / BCHQuantity).toFixed(2);
            $("#bitcoin-cash-avg-cost").text("$" + BCHAverage)
            console.log("BCH average is " + BCHAverage)

            $("#bitcoin-cash-cur-price").text("$" + currentPriceBCH);

            let BCHDayTotal = (oneDayBCH * BCHQuantity);
            console.log("BCH day total is " + BCHDayTotal);

            let BCHDayChange = (BCHValue - BCHDayTotal).toFixed(2);
            $("#bitcoin-cash-24-dol").text("$" + BCHDayChange);
            console.log("BCH day change is " + BCHDayChange);

            let BCHDayPercentChange = ((BCHDayChange / BCHValue) * 100).toFixed(2);
            $("#bitcoin-cash-24-per").text (BCHDayPercentChange + "%");

            let BCHMonthTotal = (oneMonthBCH * BCHQuantity);
            console.log("BCH month total is " + BCHMonthTotal);

            let BCHMonthChange = (BCHValue - BCHMonthTotal).toFixed(2);
            $("#bitcoin-cash-month-dol").text("$" + BCHMonthChange);
            console.log("BCH month change is " + BCHMonthChange);

            let BCHMonthPercentChange = ((BCHMonthChange / BCHValue) * 100).toFixed(2);
            $("#bitcoin-cash-month-per").text (BCHMonthPercentChange + "%");
       
        makePosNeg();
        }

        function getWallet(){
            let walletTotal = ((currentPriceBTC* BTCQuantity) + (currentPriceLTC * LTCQuantity) + (currentPriceETH * ETHQuantity) + (currentPriceBCH * BCHQuantity)).toFixed(2);
            $("#usd-wallet").text("$" + walletTotal);
            console.log("btc is " + BTCQuantity);
    
            let walletBTCTotal = (walletTotal / currentPriceBTC).toFixed(4);
            $("#btc-wallet").append("<h3>&#x0e3f " + walletBTCTotal + "</h3>");
            

            console.log("wallet is " + walletTotal);
            // console.log("test wallet " + newCurrentPriceArray[0] * BTCQuantity);
            let walletDayTotal = ((oneDayBTC * BTCQuantity) + (oneDayLTC * LTCQuantity) + (oneDayETH * ETHQuantity) + (oneDayBCH * BCHQuantity));
            console.log('wallet day total is ' + walletDayTotal);

            let walletMonthTotal = ((oneMonthBTC * BTCQuantity) + (oneMonthLTC * LTCQuantity) + (oneMonthETH * ETHQuantity) + (oneMonthBCH * BCHQuantity));
            console.log("month wallet is " + walletMonthTotal);

            let walletDayChange = (walletTotal - walletDayTotal).toFixed(2);
            $("#24dollar-wallet").text("$" + walletDayChange);
            console.log("wallet day change is " + walletDayChange);
    
            let walletDayPercentChange = ((walletDayChange / walletTotal) * 100).toFixed(2);
            $("#24percent-wallet").text(walletDayPercentChange + "%")

    
            let walletMonthChange = (walletTotal - walletMonthTotal).toFixed(2);
            $("#month-dollar-wallet").text(walletMonthChange);
    
            let walletMonthPercentChange = ((walletMonthChange / walletTotal) *100).toFixed(2);
            $("#month-percent-wallet").text(walletMonthPercentChange + "%");
            };  
            makePosNeg();
    };

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
        $.post("/api/coins", trade);
        // $newItemInput.val("");
    };
});