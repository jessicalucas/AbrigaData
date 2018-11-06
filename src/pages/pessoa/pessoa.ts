import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PessoaProvider, Pessoa } from '../../providers/pessoa/pessoa';


@IonicPage() 
@Component({
  selector: 'page-pessoa',
  templateUrl: 'pessoa.html',
})
export class PessoaPage {
	model: Pessoa;

  pessoas: any[] = [];
	onlyInactives: boolean = false;
	searchText: string = null;

	constructor(public navCtrl: NavController, private toast: ToastController, private pessoaProvider: PessoaProvider) { }

	ionViewDidEnter() {
		this.getAllPessoas();
	}

	getAllPessoas() {
		this.pessoaProvider.getAll(this.searchText)
		  .then((result: any[]) => {
			this.pessoas = result;
		  });
	}
	
	addPessoa() {
		this.navCtrl.push('CadastroPessoaPage');
    }

  editPessoa(cd_pessoa: number) {
		this.navCtrl.push('CadastroPessoaPage', { cd_pessoa: cd_pessoa });
  }
	
	removePessoa(pessoa: Pessoa) {
		this.pessoaProvider.remove(pessoa.cd_pessoa)
		  .then(() => {
			// Removendo do array de produtos
			var index = this.pessoas.indexOf(pessoa);
			this.pessoas.splice(index, 1);
			this.toast.create({ message: 'Pessoa removida.', duration: 3000, position: 'botton' }).present();
		  })
	}
	
	filterPessoas(ev: any) {
		this.getAllPessoas();
	}

}

