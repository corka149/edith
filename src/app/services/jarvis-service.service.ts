import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShoppingList } from '../models/shopping-list';


@Injectable({
  providedIn: 'root'
})
export class JarvisServiceService {

  constructor(private httpClient: HttpClient) { }

  /**
   * getAllOpenShoppingLists
   */
  public getAllOpenShoppingLists(): Observable<[ShoppingList]> {
    return null;
  }
}
