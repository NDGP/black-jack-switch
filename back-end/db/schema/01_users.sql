DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    flag VARCHAR(255),
    bankroll INT,
    thp INT,
    te INT,
    mwh INT,
    mlh INT,
    mws INT, 
    mls INT,
    wp INT,
    wpdd INT, 
    bj INT,
    bjp INT
    ); 


