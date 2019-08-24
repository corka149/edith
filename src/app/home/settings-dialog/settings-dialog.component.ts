import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss'],
})
export class SettingsDialogComponent implements OnInit {

  private jrvAddress = '';
  private uName = '';
  private pw = '';

  constructor(
    private modalCtrl: ModalController,
    private configService: ConfigService
  ) { }

  async ngOnInit() {
    this.jarvisAddress =  await this.configService.getHost();
    this.username = await this.configService.getUsername();
    this.password = await this.configService.getPassword();
  }

  closingDialog() {
    this.modalCtrl.dismiss();
  }

  saveAndclosingDialog() {
    this.configService.setHost(this.jarvisAddress);
    this.configService.setUsername(this.username);
    this.configService.setPassword(this.password);
    this.modalCtrl.dismiss();
  }

  // ===== ===== ===== =====
  // accessor
  // ===== ===== ===== =====

  get jarvisAddress(): string {
    return this.jrvAddress;
  }
  set jarvisAddress(address: string) {
    this.jrvAddress = address;
  }
  get username(): string {
    return this.uName;
  }
  set username(username: string) {
    this.uName = username;
  }
  get password(): string {
    return this.pw;
  }
  set password(password: string) {
    this.pw = password;
  }
}
