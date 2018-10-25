import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class GrupoFamiliarProvider {

  constructor(private dbProvider: DatabaseProvider) {  }
  
  public insert(grupo: GrupoFamiliar) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {

        let data;
        let sql;
        db.executeSql('select max(cd_grupo) max from GrupoFamiliar', null)
        .then((saida: any) =>{
          
          if (saida.rows.item(0).max == null) {
            sql = 'insert into GrupoFamiliar (cd_pessoa, grau_parentesco, nome, cpf) values (?, ?, ?, ?)';
            data = [grupo.cd_pessoa, grupo.grau_parentesco, grupo.nome, grupo.cpf];
          }
          else {
            sql = 'insert into GrupoFamiliar (cd_pessoa, grau_parentesco, nome, cpf) values (?, ?, ?, ?)';
            data = [grupo.cd_pessoa, grupo.grau_parentesco, grupo.nome, grupo.cpf];
          }
        
          return db.executeSql(sql, data)
            .then((a:any) => console.log("Grupo Familiar inserido"))
            .catch((e) => console.error(e));
          })
      })
      .catch((e) => console.error(e));
  }

  public update(grupo: GrupoFamiliar) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update GrupoFamiliar set cd_pessoa = ? grau_parentesco = ? nome = ? cpf = ? where cd_grupo = ?';
        let data = [grupo.cd_pessoa, grupo.grau_parentesco, grupo.nome, grupo.cpf, grupo.cd_grupo];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(cd_grupo: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from GrupoFamiliar where cd_grupo = ?';
        let data = [cd_grupo];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(cd_grupo: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from GrupoFamiliar where cd_grupo = ?';
        let data = [cd_grupo];
 
        return db.executeSql(sql, data)
			.then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let grupo = new GrupoFamiliar();
              grupo.cd_grupo = item.cd_grupo;
              grupo.cd_pessoa = item.cd_pessoa;
              grupo.nome = item.nome;
              grupo.grau_parentesco = item.grau_parentesco;
              grupo.cpf = item.cpf;
 
              return grupo;
            }
			return null;
			})
          .catch((e) => console.error(e));
		})
      .catch((e) => console.error(e));
  }
  
  public getAll(cd_pessoa: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM GrupoFamiliar where cd_pessoa = ?';
        let data = [cd_pessoa]
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let grupo: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var integrante = data.rows.item(i);
                grupo.push(integrante);
              }
              return grupo;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}


export class GrupoFamiliar {
  cd_grupo: number;
  cd_pessoa: number;
  grau_parentesco: string;
  nome: string;
  cpf: string;
}