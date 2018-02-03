$(document).ready( function() {

    // var nameInput = $("#coin-name");
    const coinList = $("tbody");
    const coinContainer = $("#portfolio-row");

    getCoinAPI();
    getCoins();
    // 2018-01-27T02:30:54.6651816Z
/***********************Outside API Calls ******************************/
/***********************************************************************/

    //wait to have this called once we have the database information. Then uses the coin code to insert into the query
    function getCoinAPI() {

        let period = "1DAY";
        let symbol = "COINBASE_SPOT_ETH_USD";
        let coin = "BTC";
        let conversionType = "USD";
        let time = moment();
        let coinID = "1182";

        //query to get the exchange rate of a coin, in a certain conversion type
        let queryURL = "https://min-api.cryptocompare.com/data/price?fsym=" + coin + "&tsyms=" + conversionType;
        
        //query to get the exchange, in a certain conversion time, at an exact time
        let queryURL1 = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coin + "&tsyms=" + conversionType + "&ts=" + time;

        let queryURL2 = "https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=" + coinID;
        
        //testy query taken from the API documentation that does not work. returns a 401 error, which is a wrong API key, but the api key is correct
        //let queryURL2 = "https://rest.coinapi.io/v1/trades/BITSTAMP_SPOT_BTC_USD/history?time_start=2016-01-01T00:00:00?apikey=DEBEF958-17B3-4AF9-8224-4C4AFF45AADA";
        
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response){
            console.log(response);
        });

        $.ajax({
            url: queryURL1,
            method: "GET"
        }).done(function(response){
            console.log(response);
            
            //can hard code console.log(response.BTC.USD) but that won't be dynamic as coin var changes
            //get the 24hr change $ rate
            //get the 24hr change percentage
            //calculate the 24hr change in $ total 

        });

        /*$.ajax({
            url: queryURL2,
            method: "GET"
        }).done(function(response){
            console.log(response.Data.General.ImageUrl);

        })
        // return coinRateConverted;*/
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
        
        var newTr = $("<tr>");
        newTr.data("author", coinData);
        newTr.append("<td>" + coinData.coin + "</td>");
        newTr.append("<td> " + coinData.total_quantity + "</td>");
        newTr.append("<td> " + coinData.coin_value + "</td>");
        newTr.append("<td> " + coinData.average_cost + "</td>");
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
        alertDiv.addClass("alert alert-danger");
        alertDiv.text("You must fill out all fields");
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
    });

    // This function inserts a new  into our database and then updates the view
	function insertTrade(event) {
        // event.preventDefault();
        
		var trade = {
            coin: coinInput.val().trim(),
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















});