import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class PessoaProvider {

  constructor(private dbProvider: DatabaseProvider) {  }
  
  public insert(pessoa: Pessoa) {
    var sql;
    var data;
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {

        db.executeSql('select max(cd_pessoa) max from Pessoa', null)
        .then((saida: any) =>{
          
          if (saida.rows.item(0).max == null) {
            sql = 'insert into Pessoa (cd_pessoa,nome, nome_social, cpf, data_nascimento, rg) values (?, ?, ?, ?, ?, ?)';
            data = [1, pessoa.nome, pessoa.nome_social, pessoa.cpf, pessoa.data_nascimento, pessoa.rg];
          }
          else {
            sql = 'insert into Pessoa (cd_pessoa,nome, nome_social, cpf, data_nascimento, rg) values (?, ?, ?, ?, ?, ?)';
            data = [saida.rows.item(0).max+1,pessoa.nome, pessoa.nome_social, pessoa.cpf, pessoa.data_nascimento, pessoa.rg];
          }

          console.log(sql);
          return db.executeSql(sql, data)
            .then((a: any) => console.log("Dados de pessoa inseridos"))
            .catch((e) => console.error(e));
        })
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
    console.log("Entrou getAll");
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM Pessoa where nome like ?';
        let data = ['%' + nome + '%'];

        console.log(sql);
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            console.log(data.rows.length);
            if (data.rows.length > 0) {
              let pessoas: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var pessoa = data.rows.item(i);
                pessoas.push(pessoa);
                console.log(data.rows.item(i).nome);
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
