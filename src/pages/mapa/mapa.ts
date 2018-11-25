import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { LocalizacaoProvider, Localizacao } from '../../providers/localizacao/localizacao';

declare var google;

@IonicPage() 
@Component({
  selector: 'page-mapa', 
  templateUrl: 'mapa.html',
})
export class MapaPage {
  visitas: Array<Localizacao>;
  map: any; 
  geocoder: any;
  dat_ini: string;
  dat_fin: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private localizacaoProvider: LocalizacaoProvider) {
  }

  ionViewDidLoad() {
    var position = new google.maps.LatLng(-19.9161037,-43.9415429);
 
    var mapOptions = {
      zoom: 18,
      center: position,
      disableDefaultUI: true
    }
 
    //this.geocoder = new google.maps.Geocoder();
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var marker = new google.maps.Marker({
      position: position,
      map: this.map,
      title: 'Locais de atendimento',
      animation: google.maps.Animation.DROP, // BOUNCE
      icon: 'assets/imgs/marker.png'
    })

    //this.localizacaoProvider.getAll()
    //  .then((result: any[]) => {this.visitas = result});
 
    /*this.visitas[0] = new Localizacao();

    if (this.visitas.length > 0){
      for(var i = 0; i < this.visitas.length; i ++){
        var marker = new google.maps.Marker({
          position: this.converteEndereco(this.visitas[i].getEndereco()),
          map: this.map,
          title: 'Locais de atendimento',
          animation: google.maps.Animation.DROP, // BOUNCE
          icon: 'assets/imgs/marker.png'
        });
      }
    }*/
  }

  converteEndereco(endereco: string){
      var position;
      this.geocoder.geocode(endereco, function(resultado, status){
        position = new google.maps.LatLng(resultado[0].geometry.location.k,resultado[0].geometry.location.D)
        .then(() => console.error("Erro ao converter o endereço" + status))
      });

      return position;
  }

  getVisitas() {
    this.localizacaoProvider.getPorData(this.dat_ini,this.dat_fin)
      .then((result: any[]) => {this.visitas = result});

      for(var i = 0; i < this.visitas.length; i ++){
        var marker = new google.maps.Marker({
          position: this.converteEndereco(this.visitas[i].getEndereco()),
          map: this.map,
          title: 'Locais de atendimento',
          animation: google.maps.Animation.DROP, 
          icon: 'assets/imgs/marker.png'
        });
      }
  }

}


