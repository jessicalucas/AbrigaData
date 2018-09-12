import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-configuracao',
  templateUrl: 'configuracao.html',
})
export class ConfiguracaoPage {

  constructor(public navCtrl: NavController, private toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguracaoPage');
  }

  gotoAtendente(){
    this.navCtrl.push('AtendentePage');
  }

  gotoReportaErro(){
    this.navCtrl.push('ReportaErroPage');
  }

}
