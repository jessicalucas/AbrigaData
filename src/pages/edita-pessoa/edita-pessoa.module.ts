import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditaPessoaPage } from './edita-pessoa';

@NgModule({
  declarations: [
    EditaPessoaPage,
  ],
  imports: [
    IonicPageModule.forChild(EditaPessoaPage),
  ],
})
export class EditaPessoaPageModule {}
