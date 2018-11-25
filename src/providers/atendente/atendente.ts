import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class AtendenteProvider {

  constructor(private dbProvider: DatabaseProvider) {  }
  
  public insert(atendente: Atendente) {
    return this.dbProvider.getDB() 
      .then((db: SQLiteObject) => {
        let sql = 'insert into Atendente (nome, login, senha, email, regional) values (?, ?, ?)';
        let data = [atendente.nome, atendente.login, atendente.senha, atendente.email, atendente.regional];
 
        return db.executeSql(sql, data)
          .then((a: any) => console.log("Cadastro de atendente inserido"))
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  
  public update(atendente: Atendente) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update Atendente set nome = ?, login = ?, senha = ?, email = ?, regional=? where cd_atendente = ?';
        let data = [atendente.nome, atendente.login, atendente.senha, atendente.cd_atendente, atendente.email, atendente.regional];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  
  public remove(cd_atendente: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from Atendente where cd_atendente = ?';
        let data = [cd_atendente];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  
  public getAtendente(cd_atendente: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from Atendente where cd_atendente = ?';
        let data = [cd_atendente];
 
        return db.executeSql(sql, data)
			.then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let atendente = new Atendente();
              atendente.cd_atendente = item.cd_atendente;
              atendente.nome = item.nome;
              atendente.login = item.login;
              atendente.senha = item.senha;
              atendente.email = item.email;

              return atendente;
            }
			return null;
			})
          .catch((e) => console.error(e));
		})
      .catch((e) => console.error(e));
  }
  
  public getLogin(login: string = null) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM Atendente where login = ? limit 1';
        let data = [login]
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            let atendentes: any;
              return atendentes;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAll() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM Atendente';
 
        return db.executeSql(sql, null)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let atendentes: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var atendente = data.rows.item(i);
                atendentes.push(atendente);
              }
              return atendentes;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}

export class Atendente {
  cd_atendente: number;
  nome: string;
  login: string;
  senha: string;
  email: string;
  regional: string;
  nivel: string;
}
