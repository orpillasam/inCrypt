CREATE DATABASE cryptos_db;

USE cryptos_db;

CREATE TABLE trades (
	id int(11) AUTO_INCREMENT NOT NULL,
	coin VARCHAR(255) NOT NULL,
	coin_symbol VARCHAR(10) NOT NULL,
	trade_type VARCHAR(255) NOT NULL,
	exchange_type VARCHAR(255) NOT NULL,
	trade_quantity int(20) NOT NULL, 
	trade_price DECIMAL(10, 2) NOT NULL,
	trade_date DATE,
	createdAt DATE,
    updatedAt DATE,
	PRIMARY KEY(id)
);

CREATE TABLE coins (
	id int(11) AUTO_INCREMENT NOT NULL,
	coin VARCHAR(255) NOT NULL,
	coin_symbol VARCHAR(10) NOT NULL,
	total_quantity int(255) NOT NULL,
	coin_value DECIMAL(10, 2) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE users (
  id int AUTO_INCREMENT,
  username varchar(30) NOT NULL,
  password varchar(100) NOT NULL,
  email varchar(30) NOT NULL,
  account_balance int DEFAULT 0,
  PRIMARY KEY(id),
  UNIQUE KEY email (email),
  UNIQUE KEY username (username)  
);


CREATE TABLE sessions (
  session_id varchar(150) NOT NULL,
  user int NOT NULL,
  PRIMARY KEY(session_id)
);

SELECT * FROM trades;
SELECT * FROM coins;
SELECT * FROM users;
