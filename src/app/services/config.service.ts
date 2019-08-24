import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private static JARVIS_ADDRESS = 'jarvisAddress';
  private static USERNAME = 'username';
  private static PASSWORD = 'password';

  private jarvisAddress = 'http://127.0.0.1:4000';
  private username = 'default_username';
  private password = 'default_password';

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
  public getHost(): Promise<string> {
    return this.storage.get(ConfigService.JARVIS_ADDRESS);
  }
  public setHost(jarvisAddress: string) {
    this.storage.set(ConfigService.JARVIS_ADDRESS, jarvisAddress);
    this.jarvisAddress = jarvisAddress;
  }

  public getUsername(): Promise<string> {
    return this.storage.get(ConfigService.USERNAME);
  }
  public setUsername(username: string) {
    this.storage.set(ConfigService.USERNAME, username);
    this.username = username;
  }

  public getPassword(): Promise<string> {
    return this.storage.get(ConfigService.PASSWORD);
  }
  public setPassword(password: string) {
    this.storage.set(ConfigService.PASSWORD, password);
    this.password = password;
  }

  /**
   * getPollingDelay
   */
  public getPollingDelay(): number {
    return 1 * 20 * 1000;
  }
}
