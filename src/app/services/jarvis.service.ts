import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShoppingList } from '../models/shopping-list';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})
export class JarvisService {

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) { }

  /**
   * getAllOpenShoppingLists
   */
  public async getAllOpenShoppingLists(): Promise<ShoppingList[]> {
    let host = await this.configService.getHost();
    const headers = await this.createBasicAuth();

    host = !!host || host.length > 0 ? host : '';
    return this.httpClient.get<[ShoppingList]>(`${host}/v1/shoppinglists/open`, {headers}).toPromise();
  }

  // private methods
  private async createBasicAuth(): Promise<HttpHeaders> {
    const username = await this.configService.getUsername();
    const password = await this.configService.getPassword();
    return new HttpHeaders({Authorization: 'Basic ' + btoa(username + ':' + password)});
  }
}
