import { SatoClient } from '../src';

var satoClient = new SatoClient('username', 'API_KEY');

// place buy order in DASH/BTC market
// satoClient
//   .order({
//     action: "buy",
//     market: "DASH/BTC",
//     price: 0.001,
//     amount: 10
//   })
//   .then(function(response) {
//     console.log(response.data);
//   })
//   .catch(function(error) {
//     console.log(error);
//   });

// get account orders
// satoClient
//   .account_orders({ market: "SATX/BTC" })
//   .then(function(response) {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch(function(error) {
//     console.log(error);
//   });

// get account trade history
// satoClient
//   .account_trade_history({
//     filter: {
//       market_id: 1,
//       type: "sell"
//     },
//     limit: 5,
//     sort_dir: "ASC"
//   })
//   .then(function(response) {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch(function(error) {
//     console.log(error);
//   });

// get account balances
// satoClient
//   .balances({
//     include_zero_balances: false,
//     coin_id: 1
//   })
//   .then(function(response) {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch(function(error) {
//     console.log(error);
//   });

// get deposit address
// satoClient
// .deposit({
//   coin: "XRP"
// })
// .then(function(response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function(error) {
//   console.log(error);
// });

// get exchange currencies
// satoClient
// .get_currencies({})
// .then(function(response) {
//   console.log(JSON.stringify(response.data));
// })
// ["catch"](function(error) {
//   console.log(error);
// });

// get market history
// satoClient
// .get_market_history({ market_id: 1, limit: 2 })
// .then(function(response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function(error) {
//   console.log(error);
// });

// get market orders
// satoClient
// .get_market_orders({ market_id: 1, type: "buy" })
// .then(function(response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function(error) {
//   console.log(error);
// });

// get markets
// satoClient
// .get_markets({ action: "search", search_q: "XRP" })
// .then(function(response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function(error) {
//   console.log(error);
// });

// place buy order in DASH/BTC market
satoClient
  .order({
    action: 'buy',
    market: 'DASH/BTC',
    price: 0.001,
    amount: 0.1,
  })
  .then(function(response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function(error) {
    console.log(error);
  });
