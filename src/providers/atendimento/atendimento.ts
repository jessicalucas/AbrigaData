import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class AtendimentoProvider {

  constructor(private dbProvider: DatabaseProvider) {  }
  
  public insert(atendimento: Atendimento) {
    let sql;
    let data;
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        db.executeSql('select max(cd_atendimento) max from Atendiento', null)
        .then((saida: any) =>{

          if (saida.rows.item(0).max == null) {
            sql = "insert into Atendimento values (cd_atendimento, cd_localizacao, "+
            "cd_pessoa, cd_atendente, cd_agenda, Data_Realizacao"+
            "Hora_Inicial, Hora_Final, tempo_rua_qtd, tempo_rua_tipo," +
            "tipo_local_pernoite, idc_trabalho_carteira,"+
            "tempo_trabalho_carteira_qtd, tempo_trabalho_carteira_tipo, "+
            "idc_trabalha_atualmente, desc_trabalho,"+
            "renda_atual, gasto_renda, municipio_origem, "+
            "tempo_resid_atual_qtd, tempo_resid_atual_tipo)"+
            "values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
            data = [0, atendimento.cd_localizacao, 
              atendimento.cd_pessoa, atendimento.cd_atendente, atendimento.cd_agenda, atendimento.data_realizacao,
              atendimento.hora_inicial, atendimento.hora_final, atendimento.tempo_rua_qtd, atendimento.tempo_rua_tipo,
              atendimento.tipo_local_pernoite, atendimento.idc_trabalho_carteira,
              atendimento.tempo_trabalho_carteira_qtd, atendimento.tempo_trabalho_carteira_tipo, 
              atendimento.idc_trabalha_atualmente, atendimento.desc_trabalho,
              atendimento.renda_atual, atendimento.gasto_renda, atendimento.municipio_origem, 
              atendimento.tempo_resid_atual_qtd, atendimento.tempo_resid_atual_tipo];
          }
          else {
            sql = "insert into Atendimento values (cd_atendimento, cd_localizacao, "+
            "cd_pessoa, cd_atendente, cd_agenda, Data_Realizacao"+
            "Hora_Inicial, Hora_Final, tempo_rua_qtd, tempo_rua_tipo," +
            "tipo_local_pernoite, idc_trabalho_carteira,"+
            "tempo_trabalho_carteira_qtd, tempo_trabalho_carteira_tipo, "+
            "idc_trabalha_atualmente, desc_trabalho,"+
            "renda_atual, gasto_renda, municipio_origem, "+
            "tempo_resid_atual_qtd, tempo_resid_atual_tipo)"+
            "values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
            data = [saida.rows.item(0).max+1, atendimento.cd_localizacao, 
              atendimento.cd_pessoa, atendimento.cd_atendente, atendimento.cd_agenda, atendimento.data_realizacao,
              atendimento.hora_inicial, atendimento.hora_final, atendimento.tempo_rua_qtd, atendimento.tempo_rua_tipo,
              atendimento.tipo_local_pernoite, atendimento.idc_trabalho_carteira,
              atendimento.tempo_trabalho_carteira_qtd, atendimento.tempo_trabalho_carteira_tipo, 
              atendimento.idc_trabalha_atualmente, atendimento.desc_trabalho,
              atendimento.renda_atual, atendimento.gasto_renda, atendimento.municipio_origem, 
              atendimento.tempo_resid_atual_qtd, atendimento.tempo_resid_atual_tipo];
          }
  
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
    })
  }

  public update(atendimento: Atendimento) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = "update Atendimento set cd_atendimento = ?, cd_localizacao = ?, "+
        "cd_pessoa = ?, cd_atendente = ?, cd_agenda = ?, Data_Realizacao = ?"+
        "Hora_Inicial = ?, Hora_Final = ?, tempo_rua_qtd = ?, tempo_rua_tipo = ?," +
        "tipo_local_pernoite = ?, idc_trabalho_carteira = ?,"+
        "tempo_trabalho_carteira_qtd = ?, tempo_trabalho_carteira_tipo = ?, "+
        "idc_trabalha_atualmente = ?, desc_trabalho = ?,"+
        "renda_atual = ?, gasto_renda = ?, municipio_origem = ?, "+
        "tempo_resid_atual_qtd = ?, tempo_resid_atual_tipo = ?"+
        "where cd_atendimento = ?"
        let data = [atendimento.cd_localizacao, 
          atendimento.cd_pessoa, atendimento.cd_atendente, atendimento.cd_agenda, atendimento.data_realizacao,
          atendimento.hora_inicial, atendimento.hora_final, atendimento.tempo_rua_qtd, atendimento.tempo_rua_tipo,
          atendimento.tipo_local_pernoite, atendimento.idc_trabalho_carteira,
          atendimento.tempo_trabalho_carteira_qtd, atendimento.tempo_trabalho_carteira_tipo, 
          atendimento.idc_trabalha_atualmente, atendimento.desc_trabalho,
          atendimento.renda_atual, atendimento.gasto_renda, atendimento.municipio_origem, 
          atendimento.tempo_resid_atual_qtd, atendimento.tempo_resid_atual_tipo, atendimento.cd_atendimento];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(cd_atendimento: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from Atendimento where cd_atendimento = ?';
        let data = [cd_atendimento];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(cd_atendimento: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from Atendimento where cd_atendimento = ?';
        let data = [cd_atendimento];
 
        return db.executeSql(sql, data)
			.then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let atendimento = new Atendimento();
              atendimento.cd_atendimento = item.cd_atendimento;
              atendimento.cd_localizacao = item.cd_localizacao;
              atendimento.cd_pessoa = item.cd_pessoa;
              atendimento.cd_atendente = item.cd_atendente;
              atendimento.cd_agenda = item.cd_agenda;
              atendimento.data_realizacao = item.Data_Realizacao;
              atendimento.hora_inicial = item.Hora_Inicial ;
              atendimento.hora_final = item.Hora_Final;
              atendimento.tempo_rua_qtd = item.tempo_rua_qtd ;
              atendimento.tempo_rua_tipo = item.tempo_rua_tipo;
              atendimento.tipo_local_pernoite = item.tipo_local_pernoite;
              atendimento.idc_trabalho_carteira = item.idc_trabalho_carteira;
              atendimento.tempo_trabalho_carteira_qtd = item.tempo_trabalho_carteira_qtd
              atendimento.tempo_trabalho_carteira_tipo = item.tempo_trabalho_carteira_tipo;
              atendimento.idc_trabalha_atualmente = item.idc_trabalha_atualmente ;
              atendimento.desc_trabalho = item.desc_trabalho;
              atendimento.renda_atual = item.renda_atual;
              atendimento.gasto_renda = item.gasto_renda ;
              atendimento.municipio_origem = item.municipio_origem;
              atendimento.tempo_resid_atual_qtd = item.tempo_resid_atual_qtd;
              atendimento.tempo_resid_atual_tipo = item.tempo_resid_atual_tipo;
    
              return atendimento;
            }
			return null;
			})
          .catch((e) => console.error(e));
		})
      .catch((e) => console.error(e));
  }
  
}

export class Atendimento {
  cd_atendimento: number;
  cd_localizacao: number;
  cd_pessoa: number;
  cd_atendente: number; 
  cd_agenda: number;
  data_realizacao: Date;
  hora_inicial: string;
  hora_final: string;
  tempo_rua_qtd: number;
  tempo_rua_tipo: string;
  tipo_local_pernoite: string;
  idc_trabalho_carteira: string;
  tempo_trabalho_carteira_qtd: number;
  tempo_trabalho_carteira_tipo: string;
  idc_trabalha_atualmente: string;
  desc_trabalho: string;
  renda_atual: string;
  gasto_renda: string;
  municipio_origem: string;
  tempo_resid_atual_qtd: number;
  tempo_resid_atual_tipo: string;
  des_observacao: string;
}