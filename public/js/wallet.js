$(document).ready( function() {

    getCoins();
    //get wallet info
    //calls the coin table, gets all the coin values

    function getCoins() {
        console.log("checking if getCoins works");
        $.get("/api/coins", function(data){


            for (var l = 0; l < data.length; l++) {
                var coinValue = data[l].coin_value;
                var totalWallet += coinValue;
                console.log("total wallet is " + totalWallet);
            }

            // var rowsToAdd = [];
            // for (var i = 0; i <data.length; i++) {
            //     rowsToAdd.push(createCoinRow(data[i]));
            // }
            // renderCoinList(rowsToAdd);
            // console.log("rows to add are " + rowsToAdd);
        });
    
    };


});    