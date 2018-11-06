import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroAtendentePage } from './cadastro-atendente';

@NgModule({
  declarations: [
    CadastroAtendentePage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroAtendentePage),
  ],
})
export class CadastroAtendentePageModule {}
