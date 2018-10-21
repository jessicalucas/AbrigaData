import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroAtendimentoPage } from './cadastro-atendimento';

@NgModule({
  declarations: [
    CadastroAtendimentoPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroAtendimentoPage),
  ],
})
export class CadastroAtendimentoPageModule {}
