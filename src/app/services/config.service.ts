import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private static JARVIS_ADDRESS = 'jarvisAddress';
  private static USERNAME = 'username';
  private static PASSWORD = 'password';

  constructor(
    private storage: Storage
  ) { }

  /**
   * getHost
   */
  public getHost(): Promise<string> {
    return this.valueFromForage(ConfigService.JARVIS_ADDRESS);
  }
  public setHost(jarvisAddress: string) {
    this.storage.set(ConfigService.JARVIS_ADDRESS, jarvisAddress);
  }

  public getUsername(): Promise<string> {
    return this.valueFromForage(ConfigService.USERNAME);
  }
  public setUsername(username: string) {
    this.storage.set(ConfigService.USERNAME, username);
  }

  public getPassword(): Promise<string> {
    return this.valueFromForage(ConfigService.PASSWORD);
  }
  public setPassword(password: string) {
    this.storage.set(ConfigService.PASSWORD, password);
  }

  private async valueFromForage(key: string): Promise<string> {
    const forage = await this.storage.ready();
    const val = await forage.getItem<string>(key);
    return !!val ? val : '';
  }
}
