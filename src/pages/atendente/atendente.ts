import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AtendenteProvider, Atendente } from '../../providers/atendente/atendente';

 
@IonicPage()
@Component({
  selector: 'page-atendente',
  templateUrl: 'atendente.html',
})
export class AtendentePage {
	model: Atendente;

  atendentes: any[] = [];
	onlyInactives: boolean = false;
  searchText: string = null;
  
  constructor(public navCtrl: NavController, private toast: ToastController, private atendenteProvider: AtendenteProvider) {
  }

  ionViewDidEnter() {
		this.getAllAtendente();
	}

	getAllAtendente() {
		this.atendenteProvider.getAll()
		  .then((result: any[]) => {
			this.atendentes = result;
		  });
	}

	editAtendente(cd_atendente: number) {
		this.navCtrl.push('CadastroAtendentePage', { cd_pessoa: cd_atendente });
	}
	
	addAtendente() {
		this.navCtrl.push('CadastroAtendentePage');
  }
	
	removeAtendente(atendente: Atendente) {
		this.atendenteProvider.remove(atendente.cd_atendente)
		  .then(() => {
			// Removendo do array de produtos
			var index = this.atendentes.indexOf(atendente);
			this.atendentes.splice(index, 1);
			this.toast.create({ message: 'Cadastro removido.', duration: 3000, position: 'botton' }).present();
			})
	}

	filterAtendente(ev: any) {
		this.getAllAtendente();
	}


} 
