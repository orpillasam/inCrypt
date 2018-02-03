$(document).ready( function() {

    function getCoinAPI() {
        var subject = "btc"
        var queryURL = "https://rest.coinapi.io/v1/exchangerate/BTC?apikey=DEBEF958-17B3-4AF9-8224-4C4AFF45AADA";
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response){
            console.log(response);
            var results = response.data;
        })

    }



});
