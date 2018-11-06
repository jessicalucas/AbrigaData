import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalizacaoProvider, Localizacao } from '../../providers/localizacao/localizacao';

declare var google;

@IonicPage()
@Component({
  selector: 'page-mapa', 
  templateUrl: 'mapa.html',
})
export class MapaPage {
  visitas: Localizacao;
  map: any;
  dat_ini: Date;
  dat_fin: Date;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    const position = new google.maps.LatLng(-19.9161037,-43.9415429);
 
    const mapOptions = {
      zoom: 18,
      center: position,
      disableDefaultUI: true
    }
 
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
 
    const marker = new google.maps.Marker({
      position: position,
      map: this.map,
 
      //Titulo
      title: 'Locais de atendimento',
 
      //Animção
      animation: google.maps.Animation.DROP, // BOUNCE
 
      //Icone
      //icon: 'assets/imgs/pessoa.png'
    });
  }

  getVisitas() {
    this.visitas = new Localizacao();
    this.visitas.setLocalizacao('Centro', 'Rua São Paulo', '300', '', 'Centro','', 'Belo Horizonte', 'MG');
    this.visitas.mapa = this.visitas.getMapa();
  }

}


