import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private static JARVIS_ADDRESS = 'jarvisAddress';

  private jarvisAddress = 'http://127.0.0.1:4000';

  constructor(
    private storage: Storage
  ) {
    storage.ready().then(localForage => {
      localForage.getItem(ConfigService.JARVIS_ADDRESS).then((address: string) => {
        this.jarvisAddress = !!address ? address : this.jarvisAddress;
      });
    });
  }

  /**
   * getHost
   */
  public getHost(): string {
    return this.jarvisAddress;
  }

  public setHost(jarvisAddress: string) {
    localStorage.setItem(ConfigService.JARVIS_ADDRESS, jarvisAddress);
    this.jarvisAddress = jarvisAddress;
  }
}
