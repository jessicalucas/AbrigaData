import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AtendimentoProvider, Atendimento } from '../../providers/atendimento/atendimento';
import { AgendaProvider, Agenda } from '../../providers/agenda/agenda';
import { PessoaProvider, Pessoa } from '../../providers/pessoa/pessoa';


@IonicPage()
@Component({
  selector: 'page-sel-agenda',
  templateUrl: 'sel-agenda.html',
}) 
export class SelAgendaPage {
  model: Atendimento;
  agenda: Agenda;
  pessoa: Pessoa;
  atendimentos: any[] = [];
  agendas: any[] = [];
  pessoas: any[] = [];
	onlyInactives: boolean = false;
  searchText: string = null;

	searchDate: Date = null;

  constructor(public navCtrl: NavController, private toast: ToastController, public navParams: NavParams,
    private atendimentoProvider: AtendimentoProvider, private pessoaProvider: PessoaProvider,
    private agendaProvider: AgendaProvider) {

      this.model = new Atendimento();
      this.pessoa = new Pessoa();
 
      if (this.navParams.data.cd_pessoa) {
        this.pessoaProvider.get(this.navParams.data.pessoa)
          .then((result: any) => {
            this.pessoa = result;
          })
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelAgendaPage');
  }

  addAtendimentoaux() {
		this.navCtrl.push('CadastroAtendimentoPage');
  }
  
  getAll() {
		this.agendaProvider.getAll(this.searchDate)
		  .then((result: any[]) => {
			this.agendas = result;
		  });
  }

  addAtendimento(cd_pessoa: number, cd_agenda: number) {
		this.navCtrl.push('SelAgendaPage',{ cd_pessoa: cd_pessoa, cd_agenda: cd_agenda });
  }

}
