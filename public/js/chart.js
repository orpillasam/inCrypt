
/*function btcChart(){
    let btcPriceArray = []
    let coinBTC = "BTC";
    let conversionType = "USD";
    //let oneDayAgo = moment().subtract(i,'days').unix();
    //let queryURL2BTC24 = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinBTC + "&tsyms=" + conversionType + "&ts=" + oneDayAgo;

}

for (var i = 1; i < 365; i++) {



}


$.ajax({
    url: "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinBTC + "&tsyms=" + conversionType + "&ts=" + moment().subtract(i, 'days').unix(),
    method: "GET"
}).done(function(response){
    console.log("url1 response is " + response);
    currentPriceBTC = response["USD"]
    newCurrentPriceArray.push(currentPriceBTC);
    console.log("BTC Current Price: " + currentPriceBTC);
    // dayChangePercent(currentPriceBTC);



*/




$(document).ready( function() {

    var btcData = [["2018/02/08",7577.1],
    [
    1518076800000,7694.96
    ],
    [
    1517990400000,6882.77
    ],
    [
    1517904000000,8139.14
    ],
    [
    1517817600000,9078.04
    ],
    [
    1517731200000,8830.89
    ],
    [
    1517644800000,8954.31
    ],
    [
    1517558400000,10133.97
    ],
    [
    1517472000000,10012.71
    ],
    [
    1517385600000,11092.54
    ],
    [
    1517299200000,11665.64
    ],
    [
    1517212800000,11402.73
    ],
    [
    1517126400000,11222.13
    ],
    [
    1517040000000,11277.27
    ],
    [
    1516953600000,11336.11
    ],
    [
    1516867200000,10852.99
    ],
    [
    1516780800000,11125.65
    ]]

    /*var btcData = [];

    $.ajax({
        url: "https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + coinBTC + "&tsyms=" + conversionType + "&ts=" + moment().subtract(i, 'days').unix(),
        method: "GET"
    }).done(function(response){
        console.log("url1 response is " + response);
        currentPriceBTC = response["USD"]
        newCurrentPriceArray.push(currentPriceBTC);
        console.log("BTC Current Price: " + currentPriceBTC);
        // dayChangePercent(currentPriceBTC);*/

   
        var myChart = Highcharts.stockChart('btc-charts', {
    
            rangeSelector: {
                selected: 1
            },
    
            title: {
                text: 'BTC Stock Price'
            },
    
            series: [{
                name: 'BTC',
                data: btcData
            }]
        });
    });