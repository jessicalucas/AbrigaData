import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AgendaProvider, Agenda } from '../../providers/agenda/agenda';
import { AtendenteProvider, Atendente } from '../../providers/atendente/atendente';
import { LocalizacaoProvider, Localizacao } from '../../providers/localizacao/localizacao';

@IonicPage()
@Component({ 
  selector: 'page-cadastro-agenda',
  templateUrl: 'cadastro-agenda.html',
})
export class CadastroAgendaPage {
  model: Agenda;
  atendente: Atendente;
  localizacao: Localizacao;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private agendaProvider: AgendaProvider, 
    private atendenteProvider: AtendenteProvider, private localizacaoProvider: LocalizacaoProvider) {
 
	this.model = new Agenda();
 
    if (this.navParams.data.cd_agenda) {
      this.agendaProvider.get(this.navParams.data.agenda)
        .then((result: any) => {
          this.model = result;
        })
    }
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroAgendaPage');
  }
  
  save() { 
    this.saveAgenda()
      .then(() => {
        
        this.saveLocalizacao()
        .then(() => console.log("Cadastro de localização salvo"))
        .catch((e) => console.error(e));

        this.toast.create({ message: 'Cadastro salvo.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar o cadastro.', duration: 3000, position: 'botton' }).present();
      });
  }
 
  private saveAgenda() {
    if (this.model.cd_agenda) {
      return this.agendaProvider.update(this.model);
    } 
    else {
      return this.agendaProvider.insert(this.model);
    }
  }

  private saveLocalizacao() {
    if (this.localizacao.cd_localizacao) {
      return this.localizacaoProvider.update(this.localizacao);
    } 
    else {
      return this.localizacaoProvider.insert(this.localizacao);
    }
  }

}
