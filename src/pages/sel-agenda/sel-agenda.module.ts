import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelAgendaPage } from './sel-agenda';

@NgModule({
  declarations: [
    SelAgendaPage,
  ],
  imports: [
    IonicPageModule.forChild(SelAgendaPage),
  ],
})
export class SelAgendaPageModule {}
