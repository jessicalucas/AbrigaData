import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PessoaProvider, Pessoa } from '../../providers/pessoa/pessoa'

@IonicPage()
@Component({
  selector: 'page-cadastro-pessoa',
  templateUrl: 'cadastro-pessoa.html',
})
export class CadastroPessoaPage {
  model: Pessoa;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private pessoaProvider: PessoaProvider) {
 
	  this.model = new Pessoa();
 
    if (this.navParams.data.cd_pessoa) {
      this.pessoaProvider.get(this.navParams.data.pessoa)
        .then((result: any) => {
          this.model = result;
        })
    }
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPessoaPage');
  }
  
  save() { 
    this.savePessoa()
      .then(() => {
        this.toast.create({ message: 'Cadastro salvo.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
        console.log("Cadastro de pessoa salvo.");
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar o cadastro.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
        console.log("Erro ao salvar cadastro de pessoa.");
      });
  }

  private savePessoa() {
    if (this.model.cd_pessoa) {
      return this.pessoaProvider.update(this.model);
    } 
    else {
      console.log("entrou save pessoa");
      return this.pessoaProvider.insert(this.model);
    }
  }

}
