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
 
				this.dropTables(db);
        // Criando as tabelas
				this.createTables(db);
 
        // Inserindo dados padrão
        this.insertDefaultItems(db);
 
      })
			.catch(e => console.log(e));
	}
	
	private dropTables(db: SQLiteObject){
		db.sqlBatch([["DROP TABLE IF EXISTS Localizacao"],
								["DROP TABLE IF EXISTS Pessoa"],
								["DROP TABLE IF EXISTS Atendente"],
								["DROP TABLE IF EXISTS GrupoFamiliar"],
								["DROP TABLE IF EXISTS Atendimento"],
								["DROP TABLE IF EXISTS Agenda"]])
		.then(() => console.log('Tabelas dropadas'))
		.catch(e => console.error('Erro ao dropar as tabelas', e));
	}

	private createTables(db: SQLiteObject) {
    // Criando as tabelas
		db.sqlBatch
		([
					["create table IF NOT EXISTS Localizacao "+
					 "(cd_localizacao interger primary key, Nome text, Logradouro text,Numero interger,"+
					 "Complemento text,Bairro text,CEP text,Municipio text,Estado text, Mapa text)"],
					
					["create table IF NOT EXISTS Pessoa "+
					 "(cd_pessoa interger primary key,cd_localizacao interger,Nome text,Nome_Social text,"+
					 "CPF text,Data_Nascimento text,RG text,"+
					 "foreign key (cd_localizacao) references Localizacao(cd_localizacao));"],
					
					["create table IF NOT EXISTS Atendente "+
					 "(cd_atendente interger primary key,Nome text,Login text,Senha text);"],
					
					["create table IF NOT EXISTS GrupoFamiliar "+
					 "(cd_grupo interger primary key,cd_pessoa interger,Grau_Parentesco text,Nome text,CPF text,"+
					 "foreign key (cd_pessoa) references Pessoa (cd_pessoa));"],
					
					["create table IF NOT EXISTS Atendimento "+
					 "(cd_atendimento interger primary key,cd_localizacao interger,cd_pessoa interger,"+
					 "cd_atendente interger, cd_agenda interger, Data_Realizacao text,Hora_Inicial text,"+
					 "Hora_Final text,"+
					 "tempo_rua_qtd interger,"+
					 "tempo_rua_tipo text,"+
					 "tipo_local_pernoite text,"+
					 "idc_trabalho_carteira text,"+
					 "tempo_trabalho_carteira_qtd interger,"+
					 "tempo_trabalho_carteira_tipo text,"+
					 "idc_trabalha_atualmente text,"+
					 "desc_trabalho text,"+
					 "renda_atual text,"+
					 "gasto_renda text,"+
					 "municipio_origem text,"+
					 "tempo_resid_atual_qtd interger ,"+
					 "tempo_resid_atual_tipo text,"+
					 "foreign key (cd_localizacao) references Localizacao (cd_localizacao),"+
					 "foreign key (cd_pessoa) references Pessoa (cd_pessoa),"+
					 "foreign key (cd_atendente) references Atendente(cd_atendente),"+
					 "foreign key (cd_agenda) references Agenda(cd_agenda));"],
								
					["create table IF NOT EXISTS Agenda "+
					 "(cd_agenda interger primary key,cd_atendente interger, cd_atendimento interger,"+
					 "Data_Abertura text,Data_Fechamento text,"+
					 "foreign key (cd_atendente) references Atendente(cd_atendente),"+
					 "foreign key (cd_atendimento) references Atendimento (cd_atendimento));"],
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
				[['insert into Atendente values (?,?,?,?)'], [1, 'Administrador', 'admin','admin']],
				[['insert into Pessoa (cd_pessoa, Nome, Nome_social, CPF, Data_Nascimento, rg) values (?,?,?,?,?,?)'],[1,'barbara','barbara','36784264','1993-06-19','723918']]
			])
			  .then(() => console.log('Dados padrões incluídos'))
			  .catch(e => console.error('Erro ao incluir dados padrões', e));
	 
			}
			else console.log("Dados padrões já carregados");
		})
		.catch(e => console.error('Erro ao validar atendentes', e));
	}
	
 

}
