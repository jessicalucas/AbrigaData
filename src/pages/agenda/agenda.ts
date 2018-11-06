import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AgendaProvider, Agenda } from '../../providers/agenda/agenda';
import { AtendenteProvider, Atendente } from '../../providers/atendente/atendente';


@IonicPage()
@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html',
})
export class AgendaPage {
  model: Agenda;
  atendente: Atendente;

  agendas: any[] = [];
	onlyInactives: boolean = false;
	searchDate: Date = null;

  constructor(public navCtrl: NavController, private toast: ToastController, 
    private agendaProvider: AgendaProvider,private atendenteProvider: AtendenteProvider) { }

	ionViewDidEnter() {
		this.getAll();
	}

	getAll() {
		this.agendaProvider.getAll(this.searchDate)
		  .then((result: any[]) => {
			this.agendas = result;
		  });
  }
  
  getAtendente(cd_atendente: number) {
		this.atendenteProvider.getAtendente(cd_atendente)
		  .then((result: any) => {
			this.atendente = result;
		  });
	}
	
	addAgenda() {
		this.navCtrl.push('CadastroAgendaPage');
    }

  editAgenda(cd_agenda: number) {
		this.navCtrl.push('CadastroAgendaPage', { cd_agenda: cd_agenda });
  }
	
	removeAgenda(agenda: Agenda) {
		this.agendaProvider.remove(agenda.cd_agenda)
		  .then(() => {
			// Removendo do array de produtos
			var index = this.agendas.indexOf(agenda);
			this.agendas.splice(index, 1);
			this.toast.create({ message: 'Agenda removida.', duration: 3000, position: 'botton' }).present();
		  })
	}
	
	filterDataAgenda(ev: any) {
		this.getAll();
	}

}

