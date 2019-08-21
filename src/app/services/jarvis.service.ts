import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ShoppingList } from '../models/shopping-list';
import { ConfigService } from './config.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { ForegroundService } from '@ionic-native/foreground-service/ngx';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class JarvisService {

  private static CACHED_LIST_KEY =  'cachedShoppingList';

  private isAvailable = false;
  private jarvisSubscription: Subscription = null;
  private shoppingListSubscription: Subscription = null;
  private timer = null;

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private backgroundMode: BackgroundMode,
    private foregroundService: ForegroundService,
    private storage: Storage
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

  public enableBackground() {
    this.backgroundMode.enable();
    this.foregroundService.start('eDITH - polling', 'Background Service');
    if (!!this.timer) {
      this.timer.stop();
    }
    this.timer = setInterval(() => this.pollJarvis(), this.configService.getPollingDelay());
  }
  public disableBackground() {
    this.backgroundMode.disable();
    this.foregroundService.stop();
  }

  public getAllOpenShoppingListsFromCache(): Promise<ShoppingList[]> {
    return  this.storage.get(JarvisService.CACHED_LIST_KEY);
  }

  // private methods
  private pollJarvis() {
    console.log('Poll jArvis');
    if (!!this.jarvisSubscription) {
      this.jarvisSubscription.unsubscribe();
    }
    this.jarvisSubscription = this.checkReadiness()
      .subscribe((isReady) => {
        this.isAvailable = isReady;
        this.requestShoppingLists();
      });
  }

  private requestShoppingLists() {
    if (this.isAvailable) {
      if (!!this.shoppingListSubscription) {
        this.shoppingListSubscription.unsubscribe();
      }
      this.shoppingListSubscription = this.getAllOpenShoppingLists()
          .subscribe(list => {
            this.storage.set(JarvisService.CACHED_LIST_KEY, list);
          });
    }
  }

  private logErrorAndReturnNull(err: any): Observable<any> {
    console.error('Error occured', err);
    return of(null);
  }
}
