$(document).ready( function() {

    btcChart();

    function btcChart(){
        btcDayArray = [];
        coinBTC = "BTC";
        conversionType = "USD";
        let days = 7;
 
        for (i = 0; i < days; i++){
            let time = 1;
            let oneDayAgo = moment().subtract(time,'days').unix();
            let queryURL2BTC24 = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinBTC + "&tsyms=" + conversionType + "&ts=" + oneDayAgo;
            $.ajax({
                url: queryURL2BTC24,
                method: "GET"
            }).done(function(response){
                oneDayBTC = response["BTC"]["USD"]
                btcDayArray.push(oneDayBTC);
                console.log(btcDayArray);
                console.log("BTC Price 24 hrs Ago: " + oneDayBTC);
            });
            
            console.log("time is " + time)

        }


           

        }
});