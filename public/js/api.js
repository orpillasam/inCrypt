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
        let time = moment().unix();
        let oneDayAgo = moment().subtract('hours', 24).unix();
        let oneWeekAgo = moment().subtract('days', 7).unix();
        let oneMonthAgo = moment().subtract('months', 1).unix();

        //query to get the current exchange rate of a coin, in a certain conversion type
        let queryURL = "https://min-api.cryptocompare.com/data/price?fsym=" + coin + "&tsyms=" + conversionType;
        
        //query to get the exchange rate of a coin, in a certain conversion type, 24 hours ago from query date
        let queryURL2 = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coin + "&tsyms=" + conversionType + "&ts=" + oneDayAgo;
        
        //query to get the exchange rate of a coin, in a certain conversion type, one week ago from query date
        let queryURL3 = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coin + "&tsyms=" + conversionType + "&ts=" + oneWeekAgo;
        
        //query to get the exchange rate of a coin, in a certain conversion type, one week ago from query date
        let queryURL4 = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coin + "&tsyms=" + conversionType + "&ts=" + oneMonthAgo;


        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response){
            let currentPrice = response["USD"]
            console.log("Current Price: " + currentPrice);
            dayChangePercent(currentPrice);
        });


        $.ajax({
            url: queryURL2,
            method: "GET"
        }).done(function(response){
            let oneDay = response["BTC"]["USD"]
            console.log("Price 24 hrs Ago: " + oneDay);
        });

        $.ajax({
            url: queryURL3,
            method: "GET"
        }).done(function(response){
            let oneWeek = response["BTC"]["USD"]
            console.log("Price 1 Week Ago: " + oneWeek);
        });
        

        $.ajax({
            url: queryURL4,
            method: "GET"
        }).done(function(response){
            let oneMonth = response["BTC"]["USD"]
            console.log("Price 1 Month Ago: " + oneMonth);
        });
        
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
    function dayChangePercent(currentPrice) {
        console.log('24 Hour Change: ' + ((currentPrice - oneDay)/oneDay)*100 + '%');
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