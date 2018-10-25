import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class LocalizacaoProvider {

  constructor(private dbProvider: DatabaseProvider) {  }
  
  public insert(localizacao: Localizacao) {
    let sql;
    let data;
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {

        db.executeSql('select max(cd_localizacao) max from Localizacao')
        .then((saida: any) =>{
          
          if (saida.rows.item(0).max == null) {
            sql = 'insert into Localizacao (cd_localizacao,nome, logradouro, numero, complemento, bairro, cep, municipio, estado, mapa) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            data = [1,localizacao.nome, localizacao.logradouro, localizacao.numero, localizacao.complemento, 
              localizacao.bairro, localizacao.cep, localizacao.municipio, localizacao.estado, localizacao.mapa];
          }
          else {
            sql = 'insert into Localizacao (cd_localizacao,nome, logradouro, numero, complemento, bairro, cep, municipio, estado, mapa) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            data = [localizacao.cd_localizacao+1, localizacao.nome, localizacao.logradouro, localizacao.numero, localizacao.complemento, 
              localizacao.bairro, localizacao.cep, localizacao.municipio, localizacao.estado, localizacao.mapa];
          }

          return db.executeSql(sql, data)
          .then((a: any) => console.log("Dados de localização inseridos"))
          .catch((e) => console.error(e));
        })
      })
      .catch((e) => console.error(e));
  }
  
  public update(localizacao: Localizacao) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update Localizacao set nome = ?, logradouro = ?, numero = ?, complemento = ?,  bairro = ?, cep = ?, municipio = ?, estado = ?, mapa = ? where cd_localizacao = ?';
        let data = [localizacao.nome, localizacao.logradouro, localizacao.numero, localizacao.complemento, 
          localizacao.bairro, localizacao.cep, localizacao.municipio, localizacao.estado, localizacao.mapa];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  
  public remove(cd_localizacao: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from Localizacao where cd_localizacao = ?';
        let data = [cd_localizacao];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  
  public get(cd_localizacao: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from Localizacao where cd_localizacao = ?';
        let data = [cd_localizacao];
 
        return db.executeSql(sql, data)
			.then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let localizacao = new Localizacao();
              localizacao.cd_localizacao = item.cd_localizacao;
              localizacao.nome = item.nome;
              localizacao.logradouro = item.logradouro;
              localizacao.numero = item.numero;
              localizacao.complemento = item.complemento;
              localizacao.bairro = item.bairro;
              localizacao.cep = item.cep;
              localizacao.municipio = item.municipio;
              localizacao.estado = item.estado;
              localizacao.mapa = item.mapa;
 
              return localizacao;
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
        let sql = 'SELECT * FROM Localizacao where nome like ?';
        let data = ['%' + nome + '%']
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let localizacoes: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var localizacao = data.rows.item(i);
                localizacoes.push(localizacao);
              }
              return localizacoes;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

}

export class Localizacao {
  cd_localizacao;
  nome: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  municipio: string;
  estado: string
  mapa: string;

  constructor() {
    
  }

  public setLocalizacao (nome: string, logradouro: string, numero: string, complemento: string,
    bairro: string, cep: string, cidade: string, estado: string){
      this.nome = nome;
      this.logradouro = logradouro;
      this.numero = numero;
      this.complemento = complemento;
      this.bairro = bairro;
      this.cep = cep;
      this.municipio = cidade;
      this.estado = estado;
      this.mapa = this.getMapa();
  }

  public getEndereco() {
    return this.logradouro + ', ' + this.numero + ' - ' + this.bairro + ', ' + this.municipio + ' - ' + this.estado;
  }
 
  public getMapa() {
    return 'https://maps.googleapis.com/maps/api/staticmap?zoom=15&size=400x400&markers=color:green|' + this.getEndereco() + '&key=AIzaSyBniJb1ZDMAI4Z3ICv9mpgZBsGEqH3_J4A'
  }

}
