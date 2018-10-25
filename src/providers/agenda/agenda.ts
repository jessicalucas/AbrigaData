import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { DateTime } from 'ionic-angular';

@Injectable()
export class AgendaProvider {

  constructor(private dbProvider: DatabaseProvider) {  }
  
  public insert(agenda: Agenda) {
    let sql;
    let data;
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {

        db.executeSql('select max(cd_agenda) max from Agenda', null)
        .then((saida: any) =>{
          
          if (saida.rows.item(0).max == null) {
            sql = 'insert into Agenda (cd_agenda,dat_abertura, dat_fechamento, cd_atendente) values (?, ?, ?, ?)';
            data = [1, agenda.dat_abertura, agenda.dat_fechamento, agenda.cd_atendente];
          }
          else {
            sql = 'insert into Agenda (cd_agenda,dat_abertura, dat_fechamento, cd_atendente) values (?, ?, ?, ?)';
            data = [saida.rows.item(0).max+1,agenda.dat_abertura, agenda.dat_fechamento, agenda.cd_atendente];
          }

          return db.executeSql(sql, data)
          .then((a: any) => console.log("Dados da agenda inseridos"))
          .catch((e) => console.error(e));
        })
      })
      .catch((e) => console.error(e));
  }
  
  public update(agenda: Agenda) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update Agenda set dat_abertura = ? dat_fechamento = ? cd_atendente = ? where cd_agenda = ?';
        let data = [agenda.dat_abertura, agenda.dat_fechamento, agenda.cd_atendente];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  
  public remove(cd_agenda: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from Agenda where cd_agenda = ?';
        let data = [cd_agenda];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  
  public get(cd_agenda: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from Agenda where cd_agenda = ?';
        let data = [cd_agenda];
 
        return db.executeSql(sql, data)
			  .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let agenda = new Agenda();
              agenda.cd_agenda = item.cd_agenda;
              agenda.dat_abertura = item.dat_abertura;
              agenda.dat_fechamento = item.dat_fechamento;
              agenda.cd_atendente = item.cd_atendente;
 
              return agenda;
            }
			return null;
			})
          .catch((e) => console.error(e));
		})
      .catch((e) => console.error(e));
  }
  
  public getAll(dat_abertura: Date = null) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM Agenda where dat_abertura like ?';
        let data = ['%' + dat_abertura + '%']
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let agendas: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var agenda = data.rows.item(i);
                agenda.push(agenda);
              }
              return agendas;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

}

export class Agenda {
  cd_agenda: number;
  dat_abertura: Date;
  dat_fechamento: Date;
  cd_atendente: number;
}
