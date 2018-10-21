import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AtendenteProvider, Atendente } from '../../providers/atendente/atendente';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage { 
	model: Atendente;

	constructor(public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private atendenteProvider: AtendenteProvider) { 

			this.model = new Atendente();
		}

	ionViewDidEnter() {
		console.log('ionViewDidLoad HomePage');
	}
	
	Menu() {
		this.navCtrl.push('MenuPage');
	}
	
	getAdmin() {
		this.atendenteProvider.getAtendente(1)
		  .then((result: Atendente) => {
			this.model = result;
		  });
	}

    
}
