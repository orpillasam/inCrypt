$(document).ready( function() {

    // var nameInput = $("#coin-name");
    const coinList = $("tbody");
    const coinContainer = $("#portfolio-row");

    let tradeInput = $("#trade-input");
    let exchangeInput = $("#exchange-input");
    let coinInput = $("#coin-input");
    let quantityInput = $("#quantity-input");
    let priceInput = $("#trade-price-input");
    let dateInput = $("#trade-date-input");

    tradeInput = tradeInput.val().trim();
    exchangeInput = exchangeInput.val().trim();
    coinInput = coinInput.val().trim();
    quantityInput = quantityInput.val().trim();
    priceInput = priceInput.val().trim();
    dateInput = dateInput.val().trim();

    


    // getCoinAPI();
    getCoins();

    //on click commands for each button

    // $(document).on("click", "button.complete", toggleComplete);
    // $(document).on("click", ".trade-item", editTrade);
    // $(document).on("keyup", ".trade-item", finishEdit);
    // $(document).on("blur", ".trade-item", cancelEdit);



    // 2018-01-27T02:30:54.6651816Z
    
/***********************Outside API Calls ******************************/
/***********************************************************************/

const coinConversion = {"Bitcoin": "BTC", "Ethereum": "ETH", "Litecoin": "LTC", "Bitcoin Cash": "BCH"};

    //wait to have this called once we have the database information. Then uses the coin code to insert into the query
    function getCoinAPI() {

        let period = "1DAY";
        let symbol = "COINBASE_SPOT_ETH_USD";
        let coin = "BTC";
        let conversionType = "USD";
        let time = "2016-01-01T00:00:00"

        //query to get the exchange rate of a coin, in a certain conversion type
        let queryURL = "https://rest.coinapi.io/v1/exchangerate/" + coin + "/" + conversionType + "?apikey=DEBEF958-17B3-4AF9-8224-4C4AFF45AADA";
        
        //query to get the exchange, in a certain conversion time, at an exact time.  DOES NOT WORK. return 401 error, which is a wrong API, but the api key is correct
        let queryURL1 = "https://rest.coinapi.io/v1/exchangerate/" + coin + "/" + conversionType + time + "?apikey=DEBEF958-17B3-4AF9-8224-4C4AFF45AADA";

        //testy query taken from the API documentation that does not work. returns a 401 error, which is a wrong API key, but the api key is correct
        let queryURL2 = "https://rest.coinapi.io/v1/trades/BITSTAMP_SPOT_BTC_USD/history?time_start=2016-01-01T00:00:00?apikey=DEBEF958-17B3-4AF9-8224-4C4AFF45AADA";

        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response){
            console.log(response);
            let coinRate = response.rate;
            console.log(coinRate);
            let coinRateConverted = coinRate.toFixed(2);
            console.log("coin rate converted is " + coinRateConverted);


        });

        $.ajax({
            url: queryURL1,
            method: "GET"
        }).done(function(response2){
            console.log(response2);
            
            //get the 24hr change $ rate
            //get the 24hr change percentage
            //calculate the 24hr change in $ total 

        });

        $.ajax({
            url: queryURL2,
            method: "GET"
        }).done(function(response2){
            console.log(response2);
            
           

        })
        // return coinRateConverted;
    };


/************************  API Routes to the Database*************************/
/*****************************************************************************/


    // a function to get the table "coins" from the database cryptos_db;
    function getCoins() {
        console.log("checking if getCoins works");
        $.get("/api/coins", function(data){
            var rowsToAdd = [];
            for (var i = 0; i <data.length; i++) {
                rowsToAdd.push(createCoinRow(data[i]));
            }
            renderCoinList(rowsToAdd);
            console.log("rows to add are " + rowsToAdd);
        });
    
    };



/*********************Functions to render data on the Coin Table*************************/
/****************************************************************************************/ 

    //appends a new coin row in the table
    function createCoinRow(coinData) {
        
        let averageCost = coinData.total_quantity * coinData.coin_value;
        // let currentPrice = 
        var newTr = $("<tr>");
        newTr.data("author", coinData);
        newTr.append("<td>" + coinData.coin + "</td>");
        newTr.append("<td> " + coinData.total_quantity + "</td>");
        newTr.append("<td> " + coinData.coin_value + "</td>");
        newTr.append("<td> " + averageCost + "</td>");
        // newTr.append("<td> " + (24hr%change) + "</td>");
        // newTr.append("<td> " + (24hr$change) + "</td>");
        // newTr.append("<td> " + (total$change) + "</td>");
        return newTr;
      }

    // A function for rendering the coins 
    function renderCoinList(rows) {
        coinList.children().not(":last").remove();
        coinContainer.children(".alert").remove();
        if (rows.length) {
        console.log(rows);
        coinList.prepend(rows);
        }
        else {
        renderEmpty();
        }
    };

    //function to create 24hr change in percent
    function dayChangePercent() {
    };

    //function to create 24hr change in USD
    function dayChangeDollar() {

    };

    //function to display total made on this coin
    function totalCoinChange() {

    };

    //function to alert if a field is empty when creating a new coin 
    function renderEmpty() {
        var alertDiv = $("<div>");
        // alertDiv.addClass("alert alert-danger");
        console.log("nothing in the coin table");
        // alertDiv.text("You must fill out all fields");
        coinContainer.append(alertDiv);
    }

    //to create a trade to send to cryptos_db, table "trades"

    // $(document).on("submit", "#trade-form", insertTrade);
    // function createTrade() {
    //     $.get("/api/trades", function(data){
    //     })
    // };

    $("#trade-submit-button").on("click", function(){
        insertTrade();
        updateCoin();
    });

    // This function inserts a new  into our database and then updates the view
	function insertTrade(event) {
        // event.preventDefault();
        
        console.log("coin input is " + coinInput);
        let coinSymbol = coinConversion[coinInput];
        console.log("coin symbol is " + coinSymbol);
		let trade = {
            coin: coinInput,
            coin_symbol: coinSymbol,
            trade_type: tradeInput,
            exchange_type: exchangeInput,
	    	trade_quantity: quantityInput,
	    	trade_price: priceInput,
            trade_date: dateInput
        };
        
        console.log("checking if insertTrade works. Trade is " + trade);
		$.post("/api/trades", trade);
		// $newItemInput.val("");

	};

    function updateCoin(event) {
        console.log("updating coin?");
        console.log("coin input is " + coinInput);
        let coinSymbol = coinConversion[coinInput];
        let coinValue = quantityInput * priceInput;
        if (exchange_type == "Sell"){
            quantityInput = Math.abs(quantityInput) * -1;
            coinValue = Math.abs(coinValue) * -1;
        }
        else{

        console.log(coinValue);
        console.log(coinInput);
        // event.preventDefault();
        var coin = {
            coin: coinInput,
            coin_symbol: coinSymbol,
            total_quantity: quantityInput,
            coin_value: coinValue
            // coin_value: req.body.coin_value
        };
        $.ajax({
            method: "PUT",
            url: "/api/coins",
            data: coin
          })
        //   .then(getCoin);

        }
    }














});