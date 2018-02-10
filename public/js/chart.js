
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

    var btcData = [["2018-02-08", 7577.1],
    [
    "2018-02-07",
    7694.96
    ],
    [
    "2018-02-06",
    6882.77
    ],
    [
    "2018-02-05",
    8139.14
    ],
    [
    "2018-02-04",
    9078.04
    ],
    [
    "2018-02-03",
    8830.89
    ],
    [
    "2018-02-02",
    8954.31
    ],
    [
    "2018-02-01",
    10133.97
    ],
    [
    "2018-01-31",
    10012.71
    ],
    [
    "2018-01-30",
    11092.54
    ],
    [
    "2018-01-29",
    11665.64
    ],
    [
    "2018-01-28",
    11402.73
    ],
    [
    "2018-01-27",
    11222.13
    ],
    [
    "2018-01-26",
    11277.27
    ],
    [
    "2018-01-25",
    11336.11
    ],
    [
    "2018-01-24",
    10852.99
    ],
    [
    "2018-01-23",
    11125.65
    ]]
    
        var myChart = Highcharts.stockChart('btc-charts', {
    
            rangeSelector: {
                selected: 1
            },
    
            title: {
                text: 'BTC Stock Price'
            },
    
            series: [{
                name: 'BTC',
                data: btcData,
                tooltip: {
                    valueDecimals: 2
                }
            }]
        });
    });