import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AtendenteProvider, Atendente } from '../../providers/atendente/atendente'

@IonicPage()
@Component({
  selector: 'page-cadastro-atendente',
  templateUrl: 'cadastro-atendente.html',
})
export class CadastroAtendentePage {
  model: Atendente;
  senha: string;
 
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private atendenteProvider: AtendenteProvider) {
 
	this.model = new Atendente();
 
    if (this.navParams.data.cd_atendente) {
      this.atendenteProvider.getAtendente(this.navParams.data.atendente)
        .then((result: any) => {
          this.model = result;
        })
    }
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroAtendentePage');
  }
  
  save() { 
    if (this.validaSenha()){
      this.saveAtendente()
        .then(() => {
          this.toast.create({ message: 'Cadastro salvo.', duration: 3000, position: 'botton' }).present();
          this.navCtrl.pop();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao salvar o cadastro.', duration: 3000, position: 'botton' }).present();
          this.navCtrl.pop();
      });
    }
    else {
      this.toast.create({ message: 'As senhas são diferentes.', duration: 3000, position: 'center' }).present();
      this.navCtrl.pop();
    }
  }

  private validaSenha() {
    if (this.senha == this.model.senha){
      return true;
    }
    return false;
  }
 
  private saveAtendente() {
    
      if (this.model.cd_atendente) {
        return this.atendenteProvider.update(this.model);
      } else {
        return this.atendenteProvider.insert(this.model);
      }
    
  }

}
