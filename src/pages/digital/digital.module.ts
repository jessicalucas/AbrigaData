import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DigitalPage } from './digital';

@NgModule({
  declarations: [
    DigitalPage,
  ],
  imports: [
    IonicPageModule.forChild(DigitalPage),
  ],
})
export class DigitalPageModule {}
