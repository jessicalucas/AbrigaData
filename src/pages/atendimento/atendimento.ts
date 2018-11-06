import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AtendimentoProvider, Atendimento } from '../../providers/atendimento/atendimento';
import { AgendaProvider, Agenda } from '../../providers/agenda/agenda';
import { PessoaProvider, Pessoa } from '../../providers/pessoa/pessoa';

@IonicPage()
@Component({
  selector: 'page-atendimento',
  templateUrl: 'atendimento.html',
})
export class AtendimentoPage {
  model: Atendimento;
  modelAgenda: Agenda;
  modelPessoa: Pessoa;
  atendimentos: any[] = [];
  agendas: any[] = [];
  pessoas: any[] = [];
	onlyInactives: boolean = false;
  searchText: string = null;
  
  constructor(public navCtrl: NavController, private toast: ToastController, 
    private AtendimentoProvider: AtendimentoProvider, private pessoaProvider: PessoaProvider,
    private agendaProvider: AgendaProvider) {
  }

  ionViewDidEnter() {
		this.getAllPessoas();
	}

	getAllPessoas() {
		this.pessoaProvider.getAll(this.searchText)
		  .then((result: any[]) => {
			this.pessoas = result;
		  });
  }
 
  getAllAgendas(){
    this.agendaProvider.getAll(this.modelAgenda.dat_abertura)
    .then((result: any[]) => {
			this.agendas = result;
		  });
  }

  getAtentimento(){
    this.AtendimentoProvider.get(this.model.cd_atendimento)
    .then((result: Atendimento) => {
			this.model = result;
		  });
  }
  
  addAtendimento(cd_pessoa: number) {
		this.navCtrl.push('CadastroAtendimentoPage',{ cd_pessoa: cd_pessoa });
  }

  addAtendimentoaux() {
		this.navCtrl.push('CadastroAtendimentoPage');
  }

  editAtendimento(cd_atendimento: number) {
		this.navCtrl.push('CadastroAtendimentoPage', { cd_atendimento: cd_atendimento });
  }
	
	removeAtendimento(atendimento: Atendimento) {
		this.AtendimentoProvider.remove(atendimento.cd_atendimento)
		  .then(() => {
			// Removendo do array de produtos
			var index = this.atendimentos.indexOf(atendimento);
			this.atendimentos.splice(index, 1);
			this.toast.create({ message: 'Atendimento removido.', duration: 3000, position: 'botton' }).present();
		  })
	}
	
	filterPessoas(ev: any) {
		this.getAllPessoas();
  }
  
  filterAgenda(ev: any) {
		this.getAllAgendas();
	}

}
