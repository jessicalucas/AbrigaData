import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalizacaoProvider, Localizacao } from '../../providers/localizacao/localizacao';


@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  visitas: Localizacao;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log("Entrou Mapa");
    //this.visitas.getVisitas();
  }

  getVisitas() {
    this.visitas = new Localizacao();
    this.visitas.setLocalizacao('Lagoinha', 'Praça Rio Branco', '100', '', 'Lagoinha','', 'Belo Horizonte', 'MG');
  }

}


