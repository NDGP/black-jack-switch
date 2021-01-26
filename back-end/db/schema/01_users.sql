DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    flag VARCHAR(255),
    bankroll INT DEFAULT 0,
    thp INT DEFAULT 0,
    te INT DEFAULT 0,
    mwh INT DEFAULT 0,
    mlh INT DEFAULT 0,
    mws INT DEFAULT 0, 
    mls INT DEFAULT 0,
    wp INT DEFAULT 0,
    wpdd INT DEFAULT 0, 
    bj INT DEFAULT 0
    ); 


