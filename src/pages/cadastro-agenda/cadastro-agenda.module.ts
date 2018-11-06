import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroAgendaPage } from './cadastro-agenda';

@NgModule({
  declarations: [
    CadastroAgendaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroAgendaPage),
  ],
})
export class CadastroAgendaPageModule {}
