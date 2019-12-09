import sato from "./index.js";
var satoClient = new sato("cryptoking", "ppUd69bap9c2KBJh1hVQ3oJrVEtmUSSf");
// var satoClient = new sato("admin", "API_KEY");

//place buy order in DASH/BTC market
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

//get account orders
// satoClient
//   .account_orders({ market: "SATX/BTC" })
//   .then(function(response) {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch(function(error) {
//     console.log(error);
//   });

//get account trade history
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

//get account balances
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

//get account balances
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

//get account balances
satoClient
  .get_currencies({})
  .then(function(response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function(error) {
    console.log(error);
  });

var json = {
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
};
