import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AtendimentoProvider, Atendimento } from '../../providers/atendimento/atendimento'

@IonicPage()
@Component({
  selector: 'page-cadastro-atendimento',
  templateUrl: 'cadastro-atendimento.html',
})
export class CadastroAtendimentoPage {
	model: Atendimento;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private atendimentoProvider: AtendimentoProvider) {
 
	this.model = new Atendimento();
 
    if (this.navParams.data.cd_atendimento) {
      this.atendimentoProvider.get(this.navParams.data.atendimento)
        .then((result: any) => {
          this.model = result;
        })
    }
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroAtendimentoPage');
  }
  
  save() { 
    this.saveAtendimento()
      .then(() => {
        this.toast.create({ message: 'Cadastro salvo.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar o cadastro.', duration: 3000, position: 'botton' }).present();
      });
  }
 
  private saveAtendimento() {
    /*if (this.model.nome) {
      return this.pessoaProvider.update(this.model);
    } else {*/
      return this.atendimentoProvider.insert(this.model);
    //}
  }

}
