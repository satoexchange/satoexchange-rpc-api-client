"use strict";
exports.__esModule = true;
var js_sha256_1 = require("js-sha256");
var jsonrpc = require("jsonrpc-lite");
var axios_1 = require("axios");
var SatoJSONRPCClient = /** @class */ (function () {
    function SatoJSONRPCClient(username, apiKey) {
        this.apiUrl = "http://satoex.local/api/v2/";
        this.username = username;
        this.apiKey = apiKey;
        this.id = 0;
    }
    SatoJSONRPCClient.prototype.auth = function (method, timestamp) {
        var toAuth = this.username + this.apiKey + method + timestamp.toString();
        return js_sha256_1.sha256(toAuth);
    };
    SatoJSONRPCClient.prototype.now = function () {
        var timestamp = Math.floor(new Date().getTime() / 1000);
        return timestamp;
    };
    SatoJSONRPCClient.prototype.request = function (id, method, params) {
        if (id < 1)
            id = 1;
        params.username = this.username;
        params.timestamp = this.now();
        params.auth = this.auth(method, params.timestamp);
        var body = jsonrpc.request(id, method, params);
        return axios_1["default"]({
            method: "post",
            url: this.apiUrl,
            data: body,
            headers: { "Content-type": "application/json" }
        });
    };
    //predefined methods
    SatoJSONRPCClient.prototype.account_orders = function (params) {
        this.id++;
        return this.request(this.id, "account_orders", params);
    };
    SatoJSONRPCClient.prototype.account_trade_history = function (params) {
        this.id++;
        return this.request(this.id, "account_trade_history", params);
    };
    SatoJSONRPCClient.prototype.balances = function (params) {
        this.id++;
        return this.request(this.id, "balances", params);
    };
    SatoJSONRPCClient.prototype.deposit = function (params) {
        this.id++;
        return this.request(this.id, "deposit", params);
    };
    SatoJSONRPCClient.prototype.order = function (params) {
        this.id++;
        return this.request(this.id, "order", params);
    };
    SatoJSONRPCClient.prototype.get_currencies = function (params) {
        this.id++;
        return this.request(this.id, "get_currencies", params);
    };
    SatoJSONRPCClient.prototype.get_market_history = function (params) {
        this.id++;
        return this.request(this.id, "get_market_history", params);
    };
    SatoJSONRPCClient.prototype.get_market_orders = function (params) {
        this.id++;
        return this.request(this.id, "get_market_orders", params);
    };
    SatoJSONRPCClient.prototype.get_markets = function (params) {
        this.id++;
        return this.request(this.id, "get_markets", params);
    };
    return SatoJSONRPCClient;
}());
exports["default"] = SatoJSONRPCClient;
