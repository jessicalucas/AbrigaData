import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtendentePage } from './atendente';

@NgModule({
  declarations: [
    AtendentePage,
  ],
  imports: [
    IonicPageModule.forChild(AtendentePage),
  ],
})
export class AtendentePageModule {}
