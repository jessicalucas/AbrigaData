import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PessoaProvider, Pessoa } from '../../providers/pessoa/pessoa';


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
 
  pessoas: any[] = [];
	onlyInactives: boolean = false;
	searchText: string = null;

	constructor(public navCtrl: NavController, private toast: ToastController, 
		private pessoaProvider: PessoaProvider) { }

	ionViewDidEnter() {
    console.log('ionViewDidLoad MenuPage');
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

	cadastroAtendimento() {
		this.navCtrl.push('AtendimentoPage');
	}
	
	cadastroAgenda() {
		this.navCtrl.push('AgendaPage');
	}
	
	Mapa() {
		this.navCtrl.push('MapaPage');
	}
	
	Relatorios() {
		this.navCtrl.push('RelatoriosPage');
  }
	
	configuracao() {
		this.navCtrl.push('ConfiguracaoPage');
	}
	
	sair(){
		this.navCtrl.push('HomePage');
	}

}
