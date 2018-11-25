import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AtendimentoProvider, Atendimento } from '../../providers/atendimento/atendimento';
import { AgendaProvider, Agenda } from '../../providers/agenda/agenda';
import { PessoaProvider, Pessoa } from '../../providers/pessoa/pessoa';

@IonicPage()
@Component({
  selector: 'page-cadastro-atendimento',
  templateUrl: 'cadastro-atendimento.html',
})
export class CadastroAtendimentoPage {
  model: Atendimento;
  pessoa: Pessoa;
  agenda: Agenda;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private atendimentoProvider: AtendimentoProvider,
    private pessoaProvider: PessoaProvider, private agendaProvider: AgendaProvider) {
 
  this.model = new Atendimento();
  this.pessoa = new Pessoa();
 
    if (this.navParams.data.cd_pessoa) {
      this.pessoaProvider.get(this.navParams.data.pessoa)
        .then((result: any) => {
          this.pessoa = result;
          this.model.cd_pessoa = this.navParams.data.cd_pessoa;
        })
    }

    if (this.navParams.data.cd_agenda) {
      this.agendaProvider.get(this.navParams.data.agenda)
        .then((result: any) => {
          this.agenda = result;
          this.model.cd_agenda = this.navParams.data.cd_pessoa;
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
    if (this.model.cd_atendimento) {
      return this.atendimentoProvider.update(this.model);
    } else {
      return this.atendimentoProvider.insert(this.model);
    }
  }

}
