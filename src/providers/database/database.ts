import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) { }
    
	public getDB() {
		return this.sqlite.create({
		  name: 'abrigadata.db',
		  location: 'default'
		});
	}
	
	public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
 
        // Criando as tabelas
        this.createTables(db);
 
        // Inserindo dados padrão
        this.insertDefaultItems(db);
 
      })
      .catch(e => console.log(e));
	}
  
	private createTables(db: SQLiteObject) {
    // Criando as tabelas
		db.sqlBatch([
		  ['create table Localizacao (cd_localizacao interger primary key autoincrement not null, Logradouro text,Numero interger,Complemento text,Bairro text,CEP text,Municipio text,Estado text)'],
		  
		  ['create table Pessoa (cd_pessoa interger primary key autoincrement not null,cd_localizacao interger,Nome text,Nome_Social text,CPF text,Data_Nascimento text,RG text,foreign key (cd_localizacao) references Localizacao(cd_localizacao));'],
		  
		  ['create table Atendente(cd_atendente interger primary key autoincrement not null,Nome text,Login text,Senha text);'],
		  
		  ['create table Grupo_Familiar (cd_grupo interger primary key autoincrement not null,cd_pessoa interger,Grau_Parentesco text,Nome text,CPF text,foreign key (cd_pessoa) references Pessoa (cd_pessoa));'],
		  
		  ['create table Atendimento (cd_atendimento interger primary key autoincrement not null,cd_localizacao interger,cd_pessoa interger,cd_atendente interger,Data_Realizacao text,Hora_Inicial text,Hora_Final text,foreign key (cd_localizacao) references Localizacao (cd_localizacao),foreign key (cd_pessoa) references Pessoa (cd_pessoa),foreign key (cd_atendente) references Atendente(cd_atendente));'],
		  
		  ['create table Relatorio (cd_relatorio interger primary key autoincrement not null,Descricao text,Tipo_Dado text,Valor_Numerico real,Valor_Bool interger,Campo_Texto text);'],
		  
		  ['create table Relatorio_Atendimento (cd_relatorio_atendimento interger primary key autoincrement not null,cd_relatorio interger,cd_atendimento interger,foreign key (cd_relatorio) references Relatorio (cd_relatorio),foreign key (cd_atendimento) references Atendimento (cd_atendimento));'],
		  
		  ['create table Agenda (cd_agenda interger primary key autoincrement not null,cd_atendente interger,cd_atendimento interger,Data_Abertura text,Data_Fechamento text,foreign key (cd_atendente) references Atendente(cd_atendente),foreign key (cd_atendimento) references Atendimento (cd_atendimento));'],
		])
		  .then(() => console.log('Tabelas criadas'))
		  .catch(e => console.error('Erro ao criar as tabelas', e));
	}
	
	private insertDefaultItems(db: SQLiteObject) {
		db.executeSql('select COUNT(cd_atendente) as qtd from Atendente', [])
		.then((data: any) => {
		  //Se não existe nenhum registro
		  if (data.rows.item(0).qtd == 0) {
	 
			// Criando as tabelas
			db.sqlBatch([
			  ['insert into Atendente (Nome) values (?)', ['Administrador']],
			  ['insert into Atendente (Login) values (?)', ['admin']],
			  ['insert into Atendente (Senha) values (?)', ['admin']],
			])
			  .then(() => console.log('Dados padrões incluídos'))
			  .catch(e => console.error('Erro ao incluir dados padrões', e));
	 
		  }
		})
		.catch(e => console.error('Erro ao validar atendentes', e));
	}
	
 

}
