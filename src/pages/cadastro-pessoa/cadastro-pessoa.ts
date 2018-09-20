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
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar o cadastro.', duration: 3000, position: 'botton' }).present();
      });
  }
 
  private savePessoa() {
    /*if (this.model.nome) {
      return this.pessoaProvider.update(this.model);
    } else {*/
      return this.pessoaProvider.insert(this.model);
    //}
  }

}
