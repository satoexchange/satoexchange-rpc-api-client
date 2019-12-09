SatoExchange Private Account API
(Last Updated: 1 Dec 2019)
Full documentation on https://www.satoexchange.com/api#account_api

INTRODUCTION

This API reference includes technical documentation needed to query private account data and trigger actions on your account like trading activities and wallet activities like deposit and withdrawal will also be supported shortly with full backwards compatibility.


SUMMARY

The account API endpoints are POST request endpoints and are intended to allow access to private account data, trading and wallet activities. Endpoints receives and return results strictly in the JSON-RPC 2.0 standards receiving and returning data in JSON format with a content type header of application/json.

To place trade orders you might need to know the market information to add as parameters from the market api section v1 or v3.

 

STANDARDS AND CONVENTIONS

API authentication is required on all requests to all endpoints by your API key.
Member can create, revoke, delete and generate new API keys anytime they want or for security reasons from their account page https://www.satoexchange.com/account/ Note: Always ensure maximum security for your API keys as they give access to your account.
Members specify the access levels and activities that can be performed on their accounts by their API keys.
Endpoints are available always and we may implement rate limiting later if abuse is discovered.
Data available in JSON format
Versioning required to avoid breaking changes and this version is v2 (api/v2/account_orders, api/v2/balances, etc.)
Content encoding: gzip supported for optimized data transfer.
No region blocked API endpoints.

TOOLS
Instead of writing complex boiler plate codes to send authenticated requests to the api server, our team and volunteers will constantly release libraries and API kits for different languages to access the API endpoints with JSON-RPC standards and with authentications seamlessly.

Both the request structures and the use of the available libraries will be contained on this page. However we may not cover fully all the documentations for all tools especially library's written by third parties, but we will try as much as we can to keep a link to every tools documentation on this page.



AUTHENTICATION
Every request must be authenticated and there are 3 parameters required for authentication:

    The account username

    The request timestamp

    And the auth token (we will see how to generate this shortly)



Example JSON-RPC request:

{"jsonrpc": "2.0", "method": "balances", "params": {"username":"user_username","timestamp":1575378667,"auth":"YOUR_AUTH_TOKEN_HERE"}, "id": 1}
Other parameters that your request might require will go in the same scope in the parameters variable as other authentication parameters.
Example if you need to get your account deposit address for BTC:

{"jsonrpc": "2.0", "method": "deposit", "params": {"username":"user_username","timestamp":1575378667,"auth":"YOUR_AUTH_TOKEN_HERE","coin":"BTC"}, "id": 1}
Note: The parameter coin was added in the same scope as other auth parameters and value BTC was supplied as the value.

This is the convention all api parameters follow except few other parameters that are expected to be an object have key-value pairs of its own.

Example of such parameters are filters in queries that return list like orders or trade histories.

The filter parameter may look like:

{"jsonrpc": "2.0", "method": "account_trade_history", "params": {"username":"user_username","timestamp":1575378667,"auth":"YOUR_AUTH_TOKEN_HERE","filter":{"market_id":24}}, "id": 1}
Note that the filter parameter has a key market_id which specifies the market for which trade history should be returned.



AUTH TOKEN:
The auth token is part of the 3 parameters required for authentication which have to be supplied in all requests.  The auth token is generated from your API key.

Auth token is the sha256 hash of your  username + Api key + request method + timestamp

A simple JavaScript example will look like:

const auth = sha256(username + apiKey + method + timestamp.toString()); //using the js-sha256 package
Where method is the request method (example account_trade_history).



API Methods and Parameters
Going forward, we will keep off the JSON-RPC boiler plates and just provide details on the method and parameters need to complete requests to each available method endpoint available assuming that you are familiar with the JSON-RPC 2.0 standards.

We will be doing this providing information about the methods and parameters and additionally with the SatoExchange JSONRPC JavaScript Client API (github.com/satoexchange/satoexchange-rpc-api-client)

SatoExchange JSONRPC JavaScript Client API
SatoExchange JavaScript client is easily initialized:

Initializing the SatoClient Library:
Require the npm satoexchange-rpc-api-client package to your workload:

$> npm i satoexchange-rpc-api-client
Use the library:

var SatoClient = require("satoexchange-rpc-api-client").SatoClient;
var satoClient = new SatoClient('username','API_KEY');
satoClient.account_orders({})
.then(function (response) {
    console.log(response.data);
})
.catch(function (error) {
    console.log(error);
});
See more details on github: github.com/satoexchange/satoexchange-rpc-api-client
Account Orders
Method: account_orders

Params:

Parameter

Required

Description

market_id

Optional

Specifies the id of market/pair to for which to return the orders. To know how to get market ids, check the market data api v1

 

Example: 12

market

Optional

An alternative to the market_id parameter. Here you specify the pair instead of the ID. You should not use both market and market_id together in the same request.

 

Example: SATX/BTC

JavaScript
satoClient.account_orders({ market: "SATX/BTC" })
    .then(function(response) {
        console.log(response.data);
    })
    .catch(function(error) {
        console.log(error);
    });
Sample Result
{
    jsonrpc: "2.0",
    id: 1,
    result: {
        orders: [
            {
                id: "576189",
                created_date: "2019-11-10 09:22:47",
                price: "0.00000008",
                amount: "97653.00000000",
                total: "0.00781224",
                fee: "0.00001562",
                net_total: "0.00782786",
                type: "buy",
                slug: "SATX/BTC"
            },
            ...
        ]
    }
}

Account Trade History
Method: account_trade_history

Params:

Parameter

Required

Description

filter

Optional

These are the parameters passed to the request if you need to return results for only some specified data category. The filter parameter is an object of other parameters as key-value pairs. Example if you need only trade histories of market SATX/BTC, firstly you need to know the market id of the target market then you can add a market_id key in the filter object.

 

Example: filter: {market_id: 22}

other query params

Optional

These are order parameters that are used to customize the set of data you want to return.


These parameters are set by default if you do not specify them and their values are returned in your results. So look at the sample results below to see the parameters

Example: order_by, sort_dir, limit, page.

JavaScript
satoClient.account_trade_history({
    filter: {
      market_id: 1,
      type: "sell"
    },
    limit: 5,
    sort_dir: "ASC"
  })
  .then(function(response) {
    console.log(response.data);
  })
  .catch(function(error) {
    console.log(error);
  });
Sample Result
{
  jsonrpc: "2.0",
  id: 1,
  result: {
    trades: [
      {
        id: "64",
        market_id: "1",
        type: "sell",
        buyer_id: "1",
        seller_id: "7778",
        buy_order_id: "111",
        sell_order_id: "709",
        created_date: "1531723034",
        chart_hour: "2018-07-16 06:00",
        amount: "0.00100000",
        total: "0.00010000",
        price: "0.10000000",
        fee: "0.00000040",
        active: "0",
        slug: "BCH/BTC",
        base_coin: "BTC",
        alt_coin: "BCH",
        base_name: "Bitcoin",
        alt_name: "Bitcoin Cash",
        actual_type: "Buy",
        net_total: "0.00010040"
      },
      ...
    ],
    limit: 5,
    page: 1,
    pages_count: 1,
    order_by: "created_date",
    sort_dir: "ASC",
    filter: { market_id: 1, type: "sell" }
  }
}
The results include the filter and query parameters and you are free to personalize any of it for the best match of the data you need.
Almost all the fields in the trades data can be filtered in the filter parameter.

Account Balances
Method: balances

Params:

Parameter

Required

Description

include_zero_balances

Optional

Specifies if to return balances where you have no values. Default is false

 

Example: include_zero_balances: true

coin_id/coin

Optional

Specifies that only the balance for a specific coin should be returned. Once this option is used, the include_zero_balances option becomes irrelevant. Ge coin ids from the stats API

 

Example: coin_id = 1 OR coin = "BTC"

JavaScript Example 1
satoClient.balances({
    include_zero_balances: false
  })
  .then(function(response) {
    console.log(response.data);
  })
  .catch(function(error) {
    console.log(error);
  }); 
Example 2
satoClient.balances({
    coin: "BTC"
  })
  .then(function(response) {
    console.log(response.data);
  })
  .catch(function(error) {
    console.log(error);
  });
Example 1 result
{
  jsonrpc: "2.0",
  id: 1,
  result: [
    {
      user_id: "1",
      coin_id: "94",
      amount: "975963.42794293",
      name: "Helenex",
      symbol: "HELX",
      id: "94",
      last_price: "0.00000146",
      buy_order_held: 0,
      sell_order_held: 0,
      order_held: "0.00000000",
      available: "975963.42794293",
      btc_value: 1.4249066047966779
    },
    ...
  ]
}
Example 2 result
{
  jsonrpc: "2.0",
  id: 1,
  result: {
    id: "1180",
    user_id: "1",
    coin_id: "1",
    amount: "0.016648288371310743",
    buy_order_held: "0.010881680000000001",
    sell_order_held: 0,
    stop_loss_held: 0,
    available: 0.005766608371310742,
    stop_loss_available: 0.016648288371310743
  }
}

Deposit
This endpoint returns the deposit address for a particular coin and the coin parameter is mandatory.

Method: deposit

Params:

Parameter

Required

Description

coin

Required

Specifies the coin for which account deposit address is needed.

 

Example: coin: "ETH"

JavaScript
satoClient.deposit({
    coin: "XRP"
  })
  .then(function(response) {
    console.log(response.data);
  })
  .catch(function(error) {
    console.log(error);
  });
Sample Result
{
  jsonrpc: "2.0",
  id: 1,
  result: {
    wallet: {
      id: "9",
      coin_id: "9",
      address: "rw2ciyaNshpHe7bCHo4bRWq6pqqynnWKQg:::ucl:::2434000991",
      symbol: "XRP"
    }
  }
}
In the case of XRP and some other wallet address that needs memo/payment id, they may be attached to the address with delimeters.



Get Currencies
Gets currencies on the exchange with their details including IDs which might be needed for supplying coin_id parameters for other API methods.

Method: get_currencies

Params:

Parameter

Required

Description

filter

Optional

These are the parameters passed to the request if you need to return results for only some specified data category. The filter parameter is an object of other parameters as key-value pairs.

 

Example: filter: {wallet_active: 1}

other query params

Optional

These are order parameters that are used to customize the set of data you want to return.


These parameters are set by default if you do not specify them and their values are returned in your results. So look at the sample results below to see the parameters

Example: order_by, sort_dir, limit, page.



NOTE: you can perform a search on the name, symbol, token_address on the coin by adding a action:"search" parameter and search_q:"YOUR SEARCH STRING" to perform the search

Example to search SATX with its contract address {action: "search", search_q: "0xe96f2c381e267a96c29bbb8ab05ab7d3527b45ab"}



This convention applies to other api endpoints that return table data.

JavaScript
satoClient.get_currencies({})
  .then(function(response) {
    console.log(response.data);
  })
  .catch(function(error) {
    console.log(error);
  });
Sample Result
{
  jsonrpc: "2.0",
  id: 1,
  result: {
    currencies: [
      {
        id: "1",
        name: "Bitcoin",
        symbol: "BTC",
        is_erc20: false,
        token_address: ""
      },
      ...
    ],
    order_by: "id",
    sort_dir: "ASC"
  }
}
The results include the filter and query parameters and you are free to personalize any of it for the best match of the data you need.
Almost all the fields in the results data can be filtered in the filter parameter.

Get Market History
Gets the recent trading history if a market identified by the market_id parameter.

Method: get_market_history

Params:

Parameter

Required

Description

market_id

Required

The id of the market for which trade histories should be returned

 

Example: market_id: 1

filter

Optional

These are the parameters passed to the request if you need to return results for only some specified data category. The filter parameter is an object of other parameters as key-value pairs.

 

Example: filter: {type: 'buy'}

other query params

Optional

These are order parameters that are used to customize the set of data you want to return.


These parameters are set by default if you do not specify them and their values are returned in your results. So look at the sample results below to see the parameters

Example: order_by, sort_dir, limit, page.



This convention applies to other api endpoints that return table data.

JavaScript
satoClient.get_market_history({ market_id: 1, limit: 10 })
  .then(function(response) {
    console.log(response.data);
  })
  .catch(function(error) {
    console.log(error);
  });
Sample Result
{
  jsonrpc: "2.0",
  id: 1,
  result: {
    market: {
      id: "1",
      slug: "BCH/BTC",
      last_price: "0.28899794",
      high: "0",
      low: "0",
      ask: "0.04500000",
      bid: "0.01600000",
      growth: "0",
      volume: "0.00000000",
      date_listed: "2018-05-31 14:55:51"
    },
    history: [
      {
        created_date: "2019-05-16 05:51:20",
        type: "buy",
        price: "0.28899794",
        amount: "0.00014455",
        total: "0.00004177"
      },
      ...
    ],
    limit: 2,
    page: 1,
    pages_count: 146
  }
}
The results include the filter and query parameters and you are free to personalize any of it for the best match of the data you need.
Almost all the fields in the results data can be filtered in the filter parameter.

Get Market Orders
Gets the recent trading history if a market identified by the market_id parameter.

Method: get_market_orders

Params:

Parameter

Required

Description

market_id

Required

The id of the market for which trade histories should be returned

 

Example: market_id: 1

filter

Optional

These are the parameters passed to the request if you need to return results for only some specified data category. The filter parameter is an object of other parameters as key-value pairs.

 

Example: filter: {type: 'buy'}

other query params

Optional

These are order parameters that are used to customize the set of data you want to return.


These parameters are set by default if you do not specify them and their values are returned in your results. So look at the sample results below to see the parameters

Example: order_by, sort_dir, limit, page.



This convention applies to other api endpoints that return table data.

type

Optional

Specifies the type of orders to return buy or sell, if not set both buy and sell orders will be returned

 

Example: type: "buy"

JavaScript
satoClient.get_market_orders({ market_id: 1})
  .then(function(response) {
    console.log(response.data);
  })
  .catch(function(error) {
    console.log(error);
  });
Sample Result
{
  jsonrpc: "2.0",
  id: 1,
  result: {
    market: {
      id: "1",
      slug: "BCH/BTC",
      last_price: "0.28899794",
      high: "0",
      low: "0",
      ask: "0.04500000",
      bid: "0.01600000",
      growth: "0",
      volume: "0.00000000",
      date_listed: "2018-05-31 14:55:51"
    },
    buy_orders: [
      { price: "0.01600000", amount: "0.01015525", total: "0.00016248" },
      { price: "0.01050001", amount: "0.03969425", total: "0.00041679" }
    ],
    sell_orders: [
      { price: "0.16999000", amount: "0.00718092", total: "0.00122068" },
      { price: "0.26999000", amount: "0.01000000", total: "0.00269990" },
      { price: "0.27654321", amount: "0.00192879", total: "0.00053339" }
    ],
    limit: 100,
    page: 1,
    pages_count: 1
  }
}
The results include the filter and query parameters and you are free to personalize any of it for the best match of the data you need.
Almost all the fields in the results data can be filtered in the filter parameter.

Get Markets
Method: get_markets

Params:

Parameter

Required

Description

filter

Optional

These are the parameters passed to the request if you need to return results for only some specified data category. The filter parameter is an object of other parameters as key-value pairs.

 

Example: filter: {active: 1}

other query params

Optional

These are order parameters that are used to customize the set of data you want to return.


These parameters are set by default if you do not specify them and their values are returned in your results. So look at the sample results below to see the parameters

Example: order_by, sort_dir, limit, page.



NOTE: you can perform a search on the name, symbol, token_address on the coin by adding a action:"search" parameter and search_q:"YOUR SEARCH STRING" to perform the search

Example to search all XRP markets {action: "search", search_q: "XRP"}



This convention applies to other api endpoints that return table data.

JavaScript
satoClient.get_markets({ action: "search", search_q: "XRP" })
  .then(function(response) {
    console.log(response.data);
  })
  .catch(function(error) {
    console.log(error);
  });
Sample Result
{
  jsonrpc: "2.0",
  id: 1,
  result: {
    search_q: "XRP",
    markets: [
      {
        id: "4",
        slug: "XRP/BTC",
        last_price: "0.00003797",
        date_listed: "2018-05-31 14:55:52"
      },
      {
        id: "31",
        slug: "XRP/ETH",
        last_price: "0.00689999",
        date_listed: "2018-05-31 14:55:53"
      },
      {
        id: "86",
        slug: "XRP/DOGE",
        last_price: "150.00000000",
        date_listed: "2018-05-31 14:55:58"
      },
      {
        id: "116",
        slug: "XRP/SATX",
        last_price: "75.00000000",
        date_listed: "2018-09-11 05:43:05"
      }
    ],
    order_by: "id",
    sort_dir: "ASC"
  }
}
The results include the filter and query parameters and you are free to personalize any of it for the best match of the data you need.
Almost all the fields in the results data can be filtered in the filter parameter.

Trade/Place Market Orders
This is the endpoint that handles all trade activities which include buy, sell, stoploss, cancel_order, cancel_all_orders, and ico_buy (one of this must be specified by the action parameter in your request). See below the parameters and how they associate with the action types.

Method: order

Params:

Parameter

Required

Description

action

Required

These specifies what type of market action you want to perform.

This includes:

  - buy - Requires parameters market, price and amount

  - sell - Requires parameters market, price and amount

  - stoploss - Requires parameters market, price and amount

  - cancel_order - Requires parameter order_id

  - cancel_all_orders - Requires parameter market_id which represents the market for which to cancel all orders

  - ico_buy - Requires parameters ico_id, buy_with and amount



Please see the parameters list below for more details.

 

Example: filter: {active: 1}

market

Required when action is buy, sell, stoploss or cancel_all_orders

Specifies the market to place order or in case of cancel_all_orders, the market for which to cancel all the orders.

Example: {market: SATX/BTC}

price

Required when action is buy, sell or stoploss

Specifies the price of the order.

Example: {price: 0.03241}

amount

Required when action is buy, sell or stoploss

Specifies the amount of the altcoin to trade. 

Example: to buy 10,000 SATX {action: "buy", market: "SATX/BTC", price: 0.00001000, amount: 10000}

order_id

Required when action is cancel_order

Specifies the id of the order to cancel.

Example: {order_id: 108910}

JavaScript Example place buy order in DASH/BTC market
satoClient.order({
    action: "buy",
    market: "DASH/BTC",
    price: 0.001,
    amount: 0.1
  })
  .then(function(response) {
    console.log(response.data);
  })
  .catch(function(error) {
    console.log(error);
  });
Sample Result
{
  jsonrpc: "2.0",
  id: 1,
  result: {
    new_order: {
      type: "buy",
      user_id: "1",
      market_id: "2",
      stake_coin_id: "1",
      created_date: "2019-12-08 20:16:30",
      initial_amount: 0.1,
      amount: 0.1,
      price: 0.001,
      total: "0.00010000",
      fee: "0.00000020",
      net_total: "0.00010020",
      status: "open",
      id: 588150,
      display_type: "Buy",
      class: "success"
    }
  }
}
Response structures varies and depends on the action in the request.

Please feel free to contact our dev support team for any issues, or improvements.
Also volunteers will be welcome to reproduce the SatoExchange JSON-RPC Client JavaScript library to other languages.

Happy coding!!!