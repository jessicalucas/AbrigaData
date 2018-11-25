import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { GrupoFamiliarProvider, GrupoFamiliar } from '../../providers/grupo-familiar/grupo-familiar';
import { PessoaProvider, Pessoa } from '../../providers/pessoa/pessoa';

@IonicPage()
@Component({
  selector: 'page-grupo-familiar',
  templateUrl: 'grupo-familiar.html',
})
export class GrupoFamiliarPage {
  model: GrupoFamiliar;
  modelPessoa: Pessoa;
  grupoFamiliar: any[] = [];
  pessoas: any[] = [];
	onlyInactives: boolean = false;
  searchText: string = null;
  
  constructor(public navCtrl: NavController, private toast: ToastController,public navParams: NavParams, 
    private GrupoFamiliarProvider: GrupoFamiliarProvider, private pessoaProvider: PessoaProvider) {

		this.model = new GrupoFamiliar();
 
    if (this.navParams.data.cd_pessoa) {
      this.pessoaProvider.get(this.navParams.data.pessoa)
        .then((result: any) => {
          this.modelPessoa = result;
        })
    }
  }

  ionViewDidEnter() {
		this.getAllIntegrantes();
	}

  getAllIntegrantes(){
    this.GrupoFamiliarProvider.getAll(this.modelPessoa.cd_pessoa)
    .then((result: any[]) => {
			this.grupoFamiliar = result;
		  });
  }

  getIntegrante(){
    this.GrupoFamiliarProvider.get(this.model.cd_grupo)
    .then((result: GrupoFamiliar) => {
			this.model = result;
		  });
  }
	
	addGrupoFamiliar() {
		this.navCtrl.push('CadastroGrupoFamiliarPage',{ });
  }

  editGrupoFamiliar(cd_grupo: number) {
		this.navCtrl.push('CadastroGrupoFamiliarPage', { cd_grupo: cd_grupo });
  }
	
	removeGrupoFamiliar(grupoFamiliar: GrupoFamiliar) {
		this.GrupoFamiliarProvider.remove(grupoFamiliar.cd_grupo)
		  .then(() => {
			// Removendo do array de produtos
			var index = this.grupoFamiliar.indexOf(grupoFamiliar);
			this.grupoFamiliar.splice(index, 1);
			this.toast.create({ message: 'Membro do grupo familiar removido.', duration: 3000, position: 'botton' }).present();
		  })
	}
	

}
