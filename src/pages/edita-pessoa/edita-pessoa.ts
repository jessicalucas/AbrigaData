import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PessoaProvider, Pessoa } from '../../providers/pessoa/pessoa'

@IonicPage()
@Component({
  selector: 'page-edita-pessoa',
  templateUrl: 'edita-pessoa.html',
})
export class EditaPessoaPage {
  model: Pessoa;
  pessoas: any[] = [];

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
    console.log('ionViewDidLoad EditaPessoaPage');
  }
  
	cadastroGrupoFamiliar(cd_pessoa: number) {
		this.navCtrl.push('GrupoFamiliarPage', { cd_pessoa: cd_pessoa });
  }
  
  foto(cd_pessoa: number) {
		this.navCtrl.push('FotoPage', { cd_pessoa: cd_pessoa });
  }
  
  digital(cd_pessoa: number) {
		this.navCtrl.push('DigitalPage', { cd_pessoa: cd_pessoa });
	}
  
  editPessoa(cd_pessoa: number) {
		this.navCtrl.push('CadastroPessoaPage', { cd_pessoa: cd_pessoa });
  }

  removePessoa(pessoa: Pessoa) {
		this.pessoaProvider.remove(pessoa.cd_pessoa)
		  .then(() => {
        
			var index = this.pessoas.indexOf(pessoa);
			this.pessoas.splice(index, 1);
			this.toast.create({ message: 'Pessoa removida.', duration: 3000, position: 'botton' }).present();
		  })
	}


}
