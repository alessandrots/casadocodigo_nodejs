1) Instalando
  $ git clone https://github.com/alessandrots/casadocodigo_nodejs.git
  $ npm install

2) INFRA
  *** Install mysql on mac:
  https://dev.mysql.com/doc/refman/5.6/en/osx-installation-pkg.html
  https://www.youtube.com/watch?v=malU8RxzjWA

  *** Install on debian
  http://wiki.locaweb.com.br/pt-br/Instalando_e_configurando_MySQL_no_Debian_6

  2.1) Startar mysql On Linux start/stop/restart from the command line:

   /etc/init.d/mysqld start
   /etc/init.d/mysqld stop
   /etc/init.d/mysqld restart

  2.2) Startar mysql On OS X to start/stop/restart MySQL pre 5.7  from the command line:

  $ sudo /usr/local/mysql/support-files/mysql.server start
  $ sudo /usr/local/mysql/support-files/mysql.server stop
  $ sudo /usr/local/mysql/support-files/mysql.server restart

  *** http://coolestguidesontheplanet.com/start-stop-mysql-from-the-command-line-terminal-osx-linux/

3)Acessando o banco
  $ mysql -u root -h localhost

  mysql> create database casadocodigo_nodejs;

  mysql> use casadocodigo_nodejs;

  create table livros (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  titulo varchar(255) DEFAULT NULL,
  descricao text,
  preco decimal(10,2) DEFAULT NULL
  );

  mysql> insert into livros (titulo, descricao, preco) values('Teste', 'descricaooo', 10);

  mysql> create database casadocodigo_nodejs_test;

  mysql> use casadocodigo_nodejs_test;

  repetir o sql de criacao da tabela

4) start the app
$ ./node_modules/.bin/nodemon app

production
$ NODE_ENV=production ./node_modules/.bin/nodemon app
