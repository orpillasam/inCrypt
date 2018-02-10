$(document).ready( function() {
    
	const coinConversion = {"Bitcoin": "BTC", "Ethereum": "ETH", "Litecoin": "LTC", "Bitcoin Cash": "BCH"};
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
    //need to pass some variables through
    // getCoins();

    //on click commands for each button

    // $(document).on("click", "button.complete", toggleComplete);
    // $(document).on("click", ".trade-item", editTrade);
    // $(document).on("keyup", ".trade-item", finishEdit);
    // $(document).on("blur", ".trade-item", cancelEdit);



    // 2018-01-27T02:30:54.6651816Z
    
/***********************Outside API Calls ******************************/
/***********************************************************************/


/************************  API Routes to the Database*************************/
/*****************************************************************************/
    // getCoins();

    // a function to get the table "coins" from the database cryptos_db;
    function getCoins() {
        console.log("checking if getCoins works");
        $.get("/api/coins", function(data){

            var rowsToAdd = [];
            var coinPriceArray = [];
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
        

        // let value = coin.Data.total_quantity * currentPrice;

        let coinPage = coinData.coin;
        let coinLink = "<a href=" + coinPage + ".html</a>";
        console.log("coinLink is " + coinLink);
        let averageCost;
        // let currentPrice = 
        var newTr = $("<tr>");
        newTr.addClass("coin-dynamic");
        newTr.attr('<a> href', "www.google.com");
        
        newTr.append("<td>" + coinData.coin + "</td>");
        newTr.append("<td> " + coinData.total_quantity + "</td>");

        // newTr.append("<td> " + value + "</td>");
        // newTr.append("<td> " + averageCost + "</td>");

        // newTr.append("<td> " + currentPrice + "</td>");
        // newTr.append("<td> " + (24hour price change) + "</td>");
        // newTr.append("<td> " + (24hour % change) + "</td>");
        // newTr.append("<td> " + (month price change) + "</td>");
        // newTr.append("<td> " + (month % change)  + "</td>");
    

  
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
        
        console.log("checking if insertTrade works. Trade is " + trade);
		$.post("/api/trades", trade);
		// $newItemInput.val("");

	};

    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


});