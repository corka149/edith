import { Component, OnInit, OnDestroy } from '@angular/core';
import { JarvisService } from '../services/jarvis.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  private static DELAY = 1 * 60 * 1000;

  private isAvailable = false;
  private jarvisSubscription: Subscription = null;
  private timer = null;

  constructor(
    private jarvis: JarvisService
  ) { }

  // ===== ===== ===== =====
  // Interface implmenetation
  // ===== ===== ===== =====

  ngOnInit(): void {
    this.timer = setInterval(() => this.pollJarvis(), HomePage.DELAY);
  }
  ngOnDestroy(): void {
    this.jarvisSubscription.unsubscribe();
  }

  // Accessors
  set isJarvisAvailable(available: boolean) {
    this.isJarvisAvailable = available;
  }
  get isJarvisAvailable(): boolean {
    return this.isAvailable;
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
      .subscribe(isReady => this.isAvailable = isReady);
  }
}
