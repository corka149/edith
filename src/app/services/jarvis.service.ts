import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ShoppingList } from '../models/shopping-list';
import { ConfigService } from './config.service';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class JarvisService {

  private static CACHED_LIST_KEY = 'cachedShoppingList';

  private isAvailable = false;
  private timer = null;

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private storage: Storage
  ) { }

  /**
   * getAllOpenShoppingLists
   */
  public async getAllOpenShoppingLists(): Promise<ShoppingList[]> {
    const host = await this.configService.getHost();
    const headers = await this.createBasicAuth();
    return this.httpClient.get<[ShoppingList]>(`${host}/v1/shoppinglists/open`, {headers}).toPromise();
  }

  /**
   * Checks if jARVIS is availble
   *
   * checkReadiness
   */
  public async checkReadiness(): Promise<boolean> {
    const host = await this.configService.getHost();
    const headers = await this.createBasicAuth();
    return this.httpClient.get(`${host}/v1/system/ready`, { headers, responseType: 'text' }).pipe(
      catchError(err => this.logErrorAndReturnNull(err)),
      map(val => val === 'jARVIS is ready')
    ).toPromise();
  }

  public startCaching() {
    if (!!this.timer) {
      this.timer.stop();
    }
    this.timer = setInterval(() => this.pollJarvis(), this.configService.getPollingDelay(), this.configService.getPollingDelay());
  }

  public getAllOpenShoppingListsFromCache(): Promise<ShoppingList[]> {
    return this.storage.get(JarvisService.CACHED_LIST_KEY);
  }

  // private methods
  private async createBasicAuth(): Promise<HttpHeaders> {
    const headers = new HttpHeaders();
    const username = await this.configService.getUsername();
    const password = await this.configService.getPassword();
    headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
    return new Promise(() => headers);
  }


  private pollJarvis() {
    console.log('Poll jArvis');
    this.checkReadiness()
      .then((isReady) => {
        this.isAvailable = isReady;
        this.requestShoppingLists();
      });
  }

  private requestShoppingLists() {
    if (this.isAvailable) {
      this.getAllOpenShoppingLists()
        .then(list => {
          this.storage.set(JarvisService.CACHED_LIST_KEY, list);
        });
    }
  }

  private logErrorAndReturnNull(err: any): Observable<any> {
    console.error('Error occured', err);
    return of(null);
  }
}
