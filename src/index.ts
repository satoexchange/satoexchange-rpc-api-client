import axios from 'axios';
import { sha256 } from 'js-sha256';
import * as jsonrpc from 'jsonrpc-lite';

export class SatoClient {
  public apiUrl: string = 'https://www.satoexchange.com/api/v2/';
  private username: string;
  private id: number;
  private apiKey: string;

  constructor(username: string, apiKey: string) {
    this.username = username;
    this.apiKey = apiKey;
    this.id = 0;
  }
  public now() {
    const timestamp = Math.floor(new Date().getTime() / 1000);
    return timestamp;
  }
  // predefined methods
  public account_orders(params: any) {
    this.id++;
    return this.request(this.id, 'account_orders', params);
  }
  public account_trade_history(params: any) {
    this.id++;
    return this.request(this.id, 'account_trade_history', params);
  }
  public balances(params: any) {
    this.id++;
    return this.request(this.id, 'balances', params);
  }
  public deposit(params: any) {
    this.id++;
    return this.request(this.id, 'deposit', params);
  }
  public order(params: any) {
    this.id++;
    return this.request(this.id, 'order', params);
  }
  public get_currencies(params: any) {
    this.id++;
    return this.request(this.id, 'get_currencies', params);
  }
  public get_market_history(params: any) {
    this.id++;
    return this.request(this.id, 'get_market_history', params);
  }
  public get_market_orders(params: any) {
    this.id++;
    return this.request(this.id, 'get_market_orders', params);
  }
  public get_markets(params: any) {
    this.id++;
    return this.request(this.id, 'get_markets', params);
  }
  private auth(method: string, timestamp: number) {
    const toAuth: string = this.username + this.apiKey + method + timestamp.toString();
    return sha256(toAuth);
  }
  private request(id: number, method: string, params: any): Promise<any> {
    if (id < 1) {
      id = 1;
    }
    params.username = this.username;
    params.timestamp = this.now();
    params.auth = this.auth(method, params.timestamp);
    const body = jsonrpc.request(id, method, params);
    return axios({
      data: body,
      headers: { 'Content-type': 'application/json' },
      method: 'post',
      url: this.apiUrl,
    });
  }
}
