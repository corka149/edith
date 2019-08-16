import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  public getAllOpenShoppingLists(): Observable<[ShoppingList]> {
    return this.httpClient.get<[ShoppingList]>(`${this.configService.getHost()}/v1/shoppinglists/open`);
  }

  /**
   * Checks if jARVIS is availble
   *
   * checkReadiness
   */
  public checkReadiness(): Observable<boolean> {
    return this.httpClient.get<string>(`${this.configService.getHost()}/v1/shoppinglists/open`).pipe(
      map(val => !!val)
    );
  }
}
