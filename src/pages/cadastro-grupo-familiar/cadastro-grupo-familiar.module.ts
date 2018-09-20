import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroGrupoFamiliarPage } from './cadastro-grupo-familiar';

@NgModule({
  declarations: [
    CadastroGrupoFamiliarPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroGrupoFamiliarPage),
  ],
})
export class CadastroGrupoFamiliarPageModule {}
