import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { PessoaProvider, Pessoa } from '../../providers/pessoa/pessoa';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	pessoas: any[] = [];
	onlyInactives: boolean = false;
	searchText: string = null;

	constructor(public navCtrl: NavController, private toast: ToastController, private pessoaProvider: PessoaProvider) { }

	ionViewDidEnter() {
		this.getAllPessoas();
	}

	getAllPessoas() {
		this.pessoaProvider.getAll(this.searchText)
		  .then((result: any[]) => {
			this.pessoas = result;
		  });
	}
	
	cadastroPessoa() {
		this.navCtrl.push('PessoaPage');
    }
	
	cadastroGrupoFamiliar() {
		this.navCtrl.push('GrupoFamiliarPage');
    }
	
	reportaErro() {
		this.navCtrl.push('ReportaErroPage');
    }

    
}
