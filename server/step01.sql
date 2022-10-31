CREATE DATABASE JOB;
USE JOB;
CREATE TABLE advertisements(
  advertisement_id INT not NULL AUTO_INCREMENT,
  PRIMARY KEY (advertisement_id),
  title VARCHAR(50) not NULL,
  place VARCHAR(50) not NULL,
  wage VARCHAR(10),
  workingtime VARCHAR(50),
  description VARCHAR(1000),
  detail_role varchar (3500),
  company VARCHAR (50)

  );
CREATE TABLE companies(
    companie_id INT not NULL AUTO_INCREMENT,
    PRIMARY KEY (companie_id),
    Name_of_companies VARCHAR(255) not NULL,
    field VARCHAR(20) not NULL,
    geographical_position VARCHAR(200) not NULL
    );
CREATE TABLE users(
    id INT not NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    firstname VARCHAR(20) not NULL,
    lastname VARCHAR(20) not NULL,
    email VARCHAR(60) not NULL,
    birthday VARCHAR(60) not NULL,
    phone VARCHAR(20) not NULL,
    Name_of_company VARCHAR(255),
    skills VARCHAR (255),
    password VARCHAR(255) not NULL,
    companie BOOLEAN DEFAULT false,
    admin BOOLEAN DEFAULT false,
    islogedin BOOLEAN DEFAULT false
    
);
    
CREATE TABLE informations(
    information_id INT not NULL AUTO_INCREMENT,
    PRIMARY KEY (information_id),
    referencing_mails VARCHAR(255),
    people_concerned VARCHAR(255),
    ad_concerned VARCHAR(255),
    email_id INT
);


CREATE TABLE applyings(
    apply_id INT not NULL AUTO_INCREMENT,
    PRIMARY KEY (apply_id),
    name VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(150)
);

CREATE TABLE account(
    user_id INT not NULL AUTO_INCREMENT,
    PRIMARY KEY (user_id),
    username VARCHAR(100),
    email VARCHAR(150),
    password VARCHAR(100)
);