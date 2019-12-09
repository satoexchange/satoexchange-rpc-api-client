import { sha256 } from "js-sha256";
import * as jsonrpc from "jsonrpc-lite";
import axios from "axios";
class SatoJSONRPCClient {
  apiUrl: string = "http://satoex.local/api/v2/";
  username: string;
  id: number;
  private apiKey: string;
  constructor(username: string, apiKey: string) {
    this.username = username;
    this.apiKey = apiKey;
    this.id = 0;
  }
  private auth(method: string, timestamp: number) {
    let toAuth: string =
      this.username + this.apiKey + method + timestamp.toString();
    return sha256(toAuth);
  }
  now() {
    var timestamp = Math.floor(new Date().getTime() / 1000);
    return timestamp;
  }
  private request(id: number, method: string, params): Promise<any> {
    if (id < 1) id = 1;
    params.username = this.username;
    params.timestamp = this.now();
    params.auth = this.auth(method, params.timestamp);
    var body = jsonrpc.request(id, method, params);
    return axios({
      method: "post",
      url: this.apiUrl,
      data: body,
      headers: { "Content-type": "application/json" }
    });
  }
  //predefined methods
  account_orders(params) {
    this.id++;
    return this.request(this.id, "account_orders", params);
  }
  account_trade_history(params) {
    this.id++;
    return this.request(this.id, "account_trade_history", params);
  }
  balances(params) {
    this.id++;
    return this.request(this.id, "balances", params);
  }
  deposit(params) {
    this.id++;
    return this.request(this.id, "deposit", params);
  }
  order(params) {
    this.id++;
    return this.request(this.id, "order", params);
  }
  get_currencies(params) {
    this.id++;
    return this.request(this.id, "get_currencies", params);
  }
  get_market_history(params) {
    this.id++;
    return this.request(this.id, "get_market_history", params);
  }
  get_market_orders(params) {
    this.id++;
    return this.request(this.id, "get_market_orders", params);
  }
  get_markets(params) {
    this.id++;
    return this.request(this.id, "get_markets", params);
  }
}
export default SatoJSONRPCClient;
