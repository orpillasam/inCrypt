$(document).ready( function() {

	const coinConversion = {"Bitcoin": "BTC", "Ethereum": "ETH", "Litecoin": "LTC", "Bitcoin Cash": "BCH"};
	const tradeList = $("tbody");
	const tradeContainer = $(".trades-row");
	let historyArray = []
	const coin = 'Bitcoin';
    // var nameInput = $("#coin-name");
    const coinList = $("tbody");
    const coinContainer = $("#portfolio-row");
    let tradeInput = $("#trade-input");
    let exchangeInput = $("#exchange-input");
    let coinInput = $("#coin-input");
    let quantityInput = $("#quantity-input");
    let priceInput = $("#trade-price-input");
    let dateInput = $("#trade-date-input");
    let currentPriceBTC;
    let currentPriceLTC;
    let currentPriceETH;
    let currentPriceBCH; 
    let currentTime = moment();
    console.log("current time is " + currentTime);

    getTrades();
	getCoins();

	//on click commands for each button 
	// $(document).on("click", "button.delete", deleteTrade);
	// $(document).on("click", "button.complete", toggleComplete);
	// $(document).on("click", ".trade-item", editTrade);
	// $(document).on("keyup", ".trade-item", finishEdit);
	// $(document).on("blur", ".trade-item", cancelEdit);
	// $(document).on("submit", ".trade-form", insertTrade, updateCoin);


/************************  API Routes to the Database*************************/
/*****************************************************************************/

	//function to get trade history from the crypto_db database
	//should only pull the data of one specific coin
    function getTrades() {
	    console.log("checking if getTrades works");
	    $.get("/api/trades/" + coin, function(data){
	        var rowsToAdd = [];
	        for (var i = 0; i <data.length; i++) {
	            rowsToAdd.push(createTradeRow(data[i]));
	        }
	        renderTradeList(rowsToAdd);
	        console.log("rows to add are " + rowsToAdd);
	    }); 
    };

    //deletes a trade from cryptos_db, table "trades"
    function deleteTrade(){
    	event.stopPropagation();
    	var id = $(this).data("id");
    	$.ajax({
    		method: "DELETE",
    		url: "/api/trades" + id
    	}).then(getTrades);	
    };

    //updates a trade from cryptos_db, table "trades"
    function updateTrade(trade) {
    	$.ajax({
    		method: "PUT",
    		url: "/api/trades",
    		data: trade
    	}).then(getTrades);
    };

  // This function inserts the trades into our database and then updates the view
	function insertTrade(event) {
		event.preventDefault();
		var trade = {
	    	coin: req.body.coin,
            coin_symbol: req.body.coin_symbol,
	    	trade_quantity: req.body.trade_quantity,
	    	trade_price: req.body.trade_price,
	    	trade_date: req.body.trade_date	
		};

		$.post("/api/trades", trade, getTrades);
		$newItemInput.val("");
		getTrades();
	};

    function updateCoin(event) {
        event.preventDefault();
        var coin = {
            coin: req.body.coin,
            coin_symbol: req.body.coin_symbol,
            total_quantity: req.body.total_quantity,
            coin_value: req.body.coin_value
        };

    }

/*********************Functions to render data on the Trade Table*************************/
/****************************************************************************************/



    //appends a new trade row in the table
    //called in function getTrades
    function createTradeRow(tradeData) {

        let tradeCost = (tradeData.trade_quantity * tradeData.trade_price).toFixed(2);
        console.log("trade cost is " + tradeCost);
        var newTr = $("<tr>");
        newTr.data("trades", tradeData);
        newTr.append("<td>" + tradeData.trade_type + "</td>");
        newTr.append("<td>" + tradeData.trade_date + "</td>");
        newTr.append("<td>" + tradeData.exchange_type + "</td>");
        newTr.append("<td> " + tradeData.trade_quantity + "</td>");
        newTr.append("<td> " + tradeData.trade_price + "</td>");
		newTr.append("<td> " + tradeCost + "</td>");
		// newTr.append("<td> Proceeds </td>");
		// newTr.append("<td> <button class='edit btn btn-default'>Edit</button>");
        // newTr.append("<td> <button class='delete btn btn-default'>Delete</button>");
		// newTr.find("button.delete").data("id", coin.id);
		// $newInputRow.find("input.edit").css("display", "none");

        return newTr;
      }

    // A function for rendering the trades
    //called in function getTrades
    function renderTradeList(rows) {
        tradeList.children().not(":last").remove();
        tradeContainer.children(".alert").remove();
        if (rows.length) {
        console.log(rows);
        tradeList.prepend(rows);
        }
        else {
		console.log("couldn't load trades");
        // renderEmpty();
        };
    };


/**********************event functions ***********************************/
/*************************************************************************/

	  // Toggles complete status
	function toggleComplete(event) {
		event.stopPropagation();
		var trade = $(this).parent().data("trades");
		trade.complete = !trade.complete;
		updateTrade(trade);
	}

    // This function starts updating a todo in the database if a user hits the "Enter Key"
     // While in edit mode
	function finishEdit() {
		var updatedTrade = $(this).data("trades");
		if (event.which === 13) {
		  updatedTrade.text = $(this).children("input").val().trim();
		  $(this).blur();
		  updateTrade(updatedTrade);
		};
	};

	// This function is called whenever a todo item is in edit mode and loses focus
	// This cancels any edits being made
	function cancelEdit() {
		var currentTodo = $(this).data("todo");
		if (currentTodo) {
		$(this).children().hide();
		$(this).children("input.edit").val(currentTodo.text);
		$(this).children("span").show();
		$(this).children("button").show();
		};
	};

function renderEmpty() {
	var alertDiv = $("<div>");
	// alertDiv.addClass("alert alert-danger");
	console.log("nothing in the coin table");
	// alertDiv.text("You must fill out all fields");
	coinContainer.append(alertDiv);
}



/*********************Functions to render data on the Coin Table*************************/
/****************************************************************************************/ 

    // a function to get the table "coins" from the database cryptos_db;
    function getCoins() {
        console.log("checking if getCoins works");
        $.get("/api/coins/" + "Bitcoin", function(data){
            var rowsToAdd = [];
            for (var i = 0; i <data.length; i++) {
                rowsToAdd.push(createCoinRow(data[i]));
            }
            renderCoinList(rowsToAdd);
            console.log("rows to add are " + rowsToAdd);
        });
    
    };

    //appends a new coin row in the table
    function createCoinRow(coinData) {
    
        var newTr = $("<tr>");
        newTr.append("<td>" + coinData.coin + "</td>");
        newTr.append("<td> " + coinData.total_quantity + "</td>");
        newTr.append("<td> " + coinData.coin_value + "</td>");
        //newTr.append("<td> " + coinData.average_cost + "</td>");
        //newTr.append("<td> " + (24hr%change) + "</td>");
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

    //function to alert if a field is empty when creating a new coin 
    function renderEmpty() {
        var alertDiv = $("<div>");
        // alertDiv.addClass("alert alert-danger");
        console.log("nothing in the coin table");
        // alertDiv.text("You must fill out all fields");
        coinContainer.append(alertDiv);
    };   

    $("#trade-submit-button").on("click", function(){
        insertTrade();
        setTimeout(function(){insertTrade();}, 2000);
    });

    // This function inserts a new  into our database and then updates the view
	function insertTrade() {
        // event.preventDefault();
        
        console.log("coin input is " + coinInput.val().trim());
        let coinSymbol = coinConversion[coinInput.val().trim()];
        console.log("coin symbol is " + coinSymbol);
		let trade = {
            coin: coinInput.val().trim(),
            coin_symbol: coinSymbol,
            trade_type: tradeInput.val().trim(),
            exchange_type: exchangeInput.val().trim(),
	    	trade_quantity: quantityInput.val().trim(),
	    	trade_price: priceInput.val().trim(),
            trade_date: dateInput.val().trim()
        };
        
        getTrades();
        console.log("checking if insertTrade works. Trade is " + trade);

		$.post("/api/trades", trade);

	};    
	
});
