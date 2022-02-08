-- criar um banco de dados chamado livraria_api

-- criar as tabelas

create table editoras (
codigo serial not null primary key, 
nome varchar(50) not null, 
site varchar(50) not null);

create table livros (
codigo serial not null primary key,
nome varchar(50) not null, 
autor varchar(50) not null, 
data_lancamento date not null, 
editora integer not null, 
foreign key (editora) references editoras (codigo));

-- inserir alguns registros
insert into editoras (nome, site) values ('Novatec' , 'https://www.novatec.com.br/') , 
('Altabooks', 'https://www.altabooks.com.br/'), ('Casa do Código', 'https://www.casadocodigo.com.br/');

insert into livros (nome, autor, data_lancamento, editora) values
('React Aprenda Praticando','Mauricio Maujor','05/01/2021',1),
('Progressive Web Apps','Guilherme Pontes','05/10/2018',3);