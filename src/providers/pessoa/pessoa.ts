import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class PessoaProvider {

  constructor(private dbProvider: DatabaseProvider) {  }
  
  public insert(pessoa: Pessoa) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into Pessoa (nome, nome_social, cpf, data_nascimento, rg) values (?, ?, ?, ?, ?)';
        let data = [pessoa.nome, pessoa.nome_social, pessoa.cpf, pessoa.data_nascimento, pessoa.rg];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  
  public update(pessoa: Pessoa) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update Pessoa set nome = ? nome_social = ? cpf = ? data_nascimento = ?  rg = ? where cd_pessoa = ?';
        let data = [pessoa.nome, pessoa.nome_social, pessoa.cpf, pessoa.data_nascimento, pessoa.rg, pessoa.cd_pessoa];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  
  public remove(cd_pessoa: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from Pessoa where cd_pessoa = ?';
        let data = [cd_pessoa];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  
  public get(cd_pessoa: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from Pessoa where cd_pessoa = ?';
        let data = [cd_pessoa];
 
        return db.executeSql(sql, data)
			.then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let pessoa = new Pessoa();
              pessoa.cd_pessoa = item.cd_pessoa;
              pessoa.nome = item.nome;
              pessoa.nome_social = item.nome_social;
              pessoa.cpf = item.cpf;
              pessoa.data_nascimento = item.data_nascimento;
              pessoa.rg = item.rg;
 
              return pessoa;
            }
			return null;
			})
          .catch((e) => console.error(e));
		})
      .catch((e) => console.error(e));
  }
  
  public getAll(nome: string = null) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM Pessoa where p.nome = ?';
        let data = ['%' + nome + '%']
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let pessoas: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var pessoa = data.rows.item(i);
                pessoas.push(pessoa);
              }
              return pessoas;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

}

export class Pessoa {
  cd_pessoa: number;
  nome: string;
  nome_social: string;
  cpf: string;
  data_nascimento: Date;
  rg: string;
}
