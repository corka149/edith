import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  /**
   * getHost
   */
  public getHost(): string {
    return 'http://localhost:4000';
  }
}
