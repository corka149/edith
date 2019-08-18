import { Component, OnInit, OnDestroy } from '@angular/core';
import { JarvisService } from '../services/jarvis.service';
import { Subscription } from 'rxjs';
import { ShoppingList } from '../models/shopping-list';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { ModalController } from '@ionic/angular';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  private static DELAY = 1 * 60 * 1000;

  private isAvailable = false;
  private jarvisSubscription: Subscription = null;
  private shoppingListSubscription: Subscription = null;
  private timer = null;
  private lists: ShoppingList[] = [];

  constructor(
    private jarvis: JarvisService,
    private backgroundMode: BackgroundMode,
    private modalController: ModalController
  ) { }

  // ===== ===== ===== =====
  // Interface implmenetation
  // ===== ===== ===== =====

  ngOnInit(): void {
    this.backgroundMode.enable();
    this.timer = setInterval(() => this.pollJarvis(), HomePage.DELAY);
  }
  ngOnDestroy(): void {
    this.jarvisSubscription.unsubscribe();
  }

  // ===== ===== ===== =====
  // accessor
  // ===== ===== ===== =====

  set isJarvisAvailable(available: boolean) {
    this.isJarvisAvailable = available;
  }
  get isJarvisAvailable(): boolean {
    return this.isAvailable;
  }
  set shopplingLists(lists: ShoppingList[]) {
    this.lists = lists;
  }
  get shopplingLists(): ShoppingList[] {
    return this.lists;
  }

  // ===== ===== ===== =====
  // public methods
  // ===== ===== ===== =====

  async showSettings() {
    const modal = await this.modalController.create({
      component: SettingsDialogComponent
    });
    return await modal.present();
  }

  // ===== ===== ===== =====
  // private methods
  // ===== ===== ===== =====

  private pollJarvis() {
    console.log('Poll jArvis');
    if (!!this.jarvisSubscription) {
      this.jarvisSubscription.unsubscribe();
    }
    this.jarvisSubscription = this.jarvis.checkReadiness()
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
      this.shoppingListSubscription = this.jarvis.getAllOpenShoppingLists()
          .subscribe(list => this.lists = list);
    }
  }
}
