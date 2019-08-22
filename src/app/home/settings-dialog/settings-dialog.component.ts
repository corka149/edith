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

  constructor(
    private modalCtrl: ModalController,
    private configService: ConfigService
  ) { }

  async ngOnInit() {
    this.jrvAddress =  await this.configService.getHost();
  }

  closingDialog() {
    this.modalCtrl.dismiss();
  }

  saveAndclosingDialog() {
    console.log(`Saved address ${this.jarvisAddress}`);
    this.configService.setHost(this.jarvisAddress);
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
}
