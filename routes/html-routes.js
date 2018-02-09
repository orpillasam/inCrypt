const path = require("path");

module.exports = (app) => {

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/coins", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/coins.html"));
    });

    app.get("/btc-coins", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/coins.html"));
    });

    app.get("/ltc-coins", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/coins.html"));
    });

    app.get("/eth-coins", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/coins.html"));
    });

    app.get("/bch-coins", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/coins.html"));
    });
}