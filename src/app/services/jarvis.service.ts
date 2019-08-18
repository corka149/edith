import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
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
  public getAllOpenShoppingLists(): Observable<ShoppingList[]> {
    return this.httpClient.get<[ShoppingList]>(`${this.configService.getHost()}/v1/shoppinglists/open`);
  }

  /**
   * Checks if jARVIS is availble
   *
   * checkReadiness
   */
  public checkReadiness(): Observable<boolean> {
    return this.httpClient.get(`${this.configService.getHost()}/v1/system/ready`, {responseType: 'text'}).pipe(
      catchError(err => this.logErrorAndReturnNull(err)),
      map(val => val === 'jARVIS is ready')
    );
  }

  // private methods

  private logErrorAndReturnNull(err: any): Observable<any> {
    console.error('Error occured', err);
    return of(null);
  }
}
