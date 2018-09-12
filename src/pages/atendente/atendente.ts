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

}
