import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class DatabaseProvider {

	carga = new CargaInicial();

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
        this.carregaGeral(db);
 
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
					 "(cd_atendente interger primary key,Nome text,Login text,Senha text,"+
					 "email text, regional text);"],
					
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
					 "foreign key (cd_agenda) references Agenda(cd_agenda));"] ,
								
					["create table IF NOT EXISTS Agenda "+
					 "(cd_agenda interger primary key,cd_atendente interger, cd_localizacao interger,"+
					 "Dat_Abertura text,Dat_Fechamento text, Regional text,"+
					 "foreign key (cd_atendente) references Atendente(cd_atendente),"+
					 "foreign key (cd_localizacao) references Localizacao (cd_localizacao));"],
				])
		  .then(() => console.log('Tabelas criadas'))
		  .catch(e => console.error('Erro ao criar as tabelas', e));
	}
	
	private insertDefaultItems(db: SQLiteObject) {
		db.executeSql("select COUNT("+ this.carga.chave +") as qtd from " + this.carga.tabela, null)
		.then((data: any) => {
		  if (data.rows.item(0).qtd == 0) {
				db.sqlBatch(this.carga.carga)
					.then(() => console.log("Tabela "+ this.carga.tabela +" carregada"))
					.catch(e => console.error("Erro ao carregar "+ this.carga.tabela, e));
			}
			else console.log(this.carga.tabela + ": dados padrões já carregados");
		})
		.catch(e => console.error("Erro ao validar "+ this.carga.tabela, e));

		return new Promise((resolve,reject)=>{ setTimeout(resolve, 0); });
	}

	private carregaGeral(db: SQLiteObject){
		this.carregaLocalizacao();
		this.insertDefaultItems(db)
		.then(() => { 
			this.carregaAtendente();
			this.insertDefaultItems(db)
			.then(() => { 
				this.carregaPessoa();
				this.insertDefaultItems(db)
				.then(() => {
					this.carregaGrupoFamiliar();
					this.insertDefaultItems(db)
					.then(() =>{
						this.carregaAgenda();
						this.insertDefaultItems(db);
					});
				});
			});
		});
	}

	private carregaAtendente(){
		var tabela = 'Atendente';
		var chave = 'cd_atendente';
		var carga = 	[['insert into Atendente values (?,?,?,?)'], [1, 'Administrador', 'admin','admin']];
		
		this.carga.setCarga(tabela,chave,carga);
		return new Promise((resolve,reject)=>{ setTimeout(resolve, 0); });
	}

	private carregaPessoa(){
		var tabela = 'Pessoa';
		var chave = 'cd_pessoa';
		var carga = 	[[['insert into Pessoa (cd_pessoa, Nome, Nome_social, CPF, Data_Nascimento, rg) values (?,?,?,?,?,?)'],[1,'Barbara','Barbara','01080255001','1993-06-19','723918']],
		[['insert into Pessoa (cd_pessoa, Nome, Nome_social, CPF, Data_Nascimento, rg) values (?,?,?,?,?,?)'],[2,'Antônio','Antônio','42908710030','1967-12-14','483927']],
		[['insert into Pessoa (cd_pessoa, Nome, Nome_social, CPF, Data_Nascimento, rg) values (?,?,?,?,?,?)'],[3,'Maria','Maria','85098490057','1980-08-05','343535']],
		[['insert into Pessoa (cd_pessoa, Nome, Nome_social, CPF, Data_Nascimento, rg) values (?,?,?,?,?,?)'],[4,'José','José','25275318065','1978-09-17','23424']],
		[['insert into Pessoa (cd_pessoa, Nome, Nome_social, CPF, Data_Nascimento, rg) values (?,?,?,?,?,?)'],[5,'João','João','54526879045','1983-01-09','423432']]];
		
		this.carga.setCarga(tabela,chave,carga);
		//return new Promise((resolve,reject)=>{ setTimeout(resolve, 0); });
	}

	private carregaLocalizacao(){
		var tabela = 'Localizacao';
		var chave = 'cd_localizacao';
		var carga = [[['insert into Localizacao (cd_localizacao,nome, logradouro, numero, complemento, bairro, cep, municipio, estado) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'],[1,'Caetés 1050','Rua dos Caetés', '1050','','Centro', '30120084', 'Belo Horizonte', 'MG']],
		[['insert into Localizacao (cd_localizacao,nome, logradouro, numero, complemento, bairro, cep, municipio, estado) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'],[2,'Restaurante Popular I','Av. do Contorno', '11484','','Barro Preto', '30110078', 'Belo Horizonte', 'MG']],
		[['insert into Localizacao (cd_localizacao,nome, logradouro, numero, complemento, bairro, cep, municipio, estado) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'],[3,'Oiapoque 216','Av. Oiapoque', '216','','Centro', '30111070', 'Belo Horizonte', 'MG']],
		[['insert into Localizacao (cd_localizacao,nome, logradouro, numero, complemento, bairro, cep, municipio, estado) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'],[4,'Hotel Cristal','R. Vinte Um de Abril', '157','','Centro', '30111030', 'Belo Horizonte', 'MG']]];
		
		this.carga.setCarga(tabela,chave,carga);
		//return new Promise((resolve,reject)=>{ setTimeout(resolve, 0); });
	}

	private carregaGrupoFamiliar(){
		var tabela = 'GrupoFamiliar';
		var chave = 'cd_grupo';
		var carga = [[['insert into GrupoFamiliar (cd_grupo, cd_pessoa, grau_parentesco, nome, cpf) values (?, ?, ?, ?)'],[1,1,'Irmão','Augusto','84948019020']],
	  [['insert into GrupoFamiliar (cd_grupo, cd_pessoa, grau_parentesco, nome, cpf) values (?, ?, ?, ?)'],[2,2,'Irmã','Tereza','29645198038']],
	  [['insert into GrupoFamiliar (cd_grupo, cd_pessoa, grau_parentesco, nome, cpf) values (?, ?, ?, ?)'],[3,2,'Côjuge','Ana','21460732090']],
	  [['insert into GrupoFamiliar (cd_grupo, cd_pessoa, grau_parentesco, nome, cpf) values (?, ?, ?, ?)'],[4,4,'Filho','Pedro','26735954068']]];
	
		this.carga.setCarga(tabela,chave,carga);
		//return new Promise((resolve,reject)=>{ setTimeout(resolve, 0); });
	}

	private carregaAgenda(){
		var tabela = 'Agenda';
		var chave = 'cd_agenda';
		var carga = [[['insert into Agenda (cd_agenda,dat_abertura, dat_fechamento, cd_atendente, regional, cd_localizacao) values (?, ?, ?, ?, ?,?)'],[1,'2018-11-20','2018-11-20',1,'Centro-sul',1]]]
		//[['insert into Agenda (cd_agenda,dat_abertura, dat_fechamento, cd_atendente, regional, cd_localizacao) values (?, ?, ?, ?, ?,?)'],[6,'2018-11-21','2018-11-21',1,'Centro-sul',2]],
	//[['insert into Agenda (cd_agenda,dat_abertura, dat_fechamento, cd_atendente, regional, cd_localizacao) values (?, ?, ?, ?, ?,?)'],[7,'2018-11-22','2018-11-22',1,'Centro-sul',3]],
	//	[['insert into Agenda (cd_agenda,dat_abertura, dat_fechamento, cd_atendente, regional, cd_localizacao) values (?, ?, ?, ?, ?,?)'],[8,'2018-11-23','2018-11-23',1,'Centro-sul',4]]];
			 
		this.carga.setCarga(tabela,chave,carga);
		//return new Promise((resolve,reject)=>{ setTimeout(resolve, 0); });
	}

}

export class CargaInicial{
	tabela: string;
	chave: string;
	carga: any;

	constructor(){}

	public setCarga(tabela: string, chave: string, carga: any){
		this.tabela = tabela;
		this.chave = chave;
		this.carga = carga;
	}
}
