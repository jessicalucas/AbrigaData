import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { GrupoFamiliarProvider, GrupoFamiliar } from '../../providers/grupo-familiar/grupo-familiar';
import { PessoaProvider, Pessoa } from '../../providers/pessoa/pessoa';

@IonicPage()
@Component({ 
  selector: 'page-cadastro-grupo-familiar',
  templateUrl: 'cadastro-grupo-familiar.html',
})
export class CadastroGrupoFamiliarPage {
  model: GrupoFamiliar; 

  constructor(public navCtrl: NavController, public navParams: NavParams,private toast: ToastController,
    private GrupoFamiliarProvider: GrupoFamiliarProvider, private pessoaProvider: PessoaProvider) {

      this.model = new GrupoFamiliar();
 
    if (this.navParams.data.cd_grupo) {
      this.GrupoFamiliarProvider.get(this.navParams.data.GrupoFamiliar)
        .then((result: any) => {
          this.model = result;
        })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroGrupoFamiliarPage');
  }

  save() { 
    this.saveGrupoFamiliar()
      .then(() => {
        this.toast.create({ message: 'Cadastro salvo.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar o cadastro.', duration: 3000, position: 'botton' }).present();
      });
  }
 
  private saveGrupoFamiliar() {
    if (this.model.nome) {
      return this.GrupoFamiliarProvider.update(this.model);
    } else {
      return this.GrupoFamiliarProvider.insert(this.model);
    }
  }

  removeGrupoFamiliar(grupoFamiliar: GrupoFamiliar) {
		this.GrupoFamiliarProvider.remove(grupoFamiliar.cd_grupo)
		  .then(() => {
				this.toast.create({ message: 'Membro do grupo familiar removido.', duration: 3000, position: 'botton' }).present();
		  })
	}

}
