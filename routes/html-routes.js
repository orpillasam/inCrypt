const path = require("path");

module.exports = (app) => {

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/coins", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/coins.html"));
    });

    app.get("/BTC", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/BTC.html"));
    });

    app.get("/LTC", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/LTC.html"));
    });

    app.get("/ETH", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/ETH.html"));
    });

    app.get("/BCH", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/BCH.html"));
    });
}