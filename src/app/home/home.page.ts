import { Component, OnInit, OnDestroy } from '@angular/core';
import { JarvisService } from '../services/jarvis.service';
import { ShoppingList } from '../models/shopping-list';
import { ModalController } from '@ionic/angular';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private lists: ShoppingList[] = [];

  constructor(
    private jarvis: JarvisService,
    private modalController: ModalController
  ) { }

  // ===== ===== ===== =====
  // Interface implmenetation
  // ===== ===== ===== =====

  async ngOnInit() {
    this.lists = await this.jarvis.getAllOpenShoppingLists();
  }

  // ===== ===== ===== =====
  // accessor
  // ===== ===== ===== =====

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

  getShoppingLists() {
    this.jarvis.getAllOpenShoppingLists().then(lists => this.lists = lists);
  }
}
