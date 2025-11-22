DROP DATABASE IF EXISTS xmasprograms25db;
CREATE DATABASE xmasprograms25db;
USE DATABASE xmasprograms25db;

-- TABLES
CREATE TABLE format (
    format_id TINYINT UNSIGNED AUTO_INCREMENT NOT NULL,
    format VARCHAR(30),
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pk_format PRIMARY KEY (format_id)
);


CREATE TABLE producer (
    producer_id SMALLINT UNSIGNED AUTO_INCREMENT NOT NULL,
    producer VARCHAR (60),
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
CONSTRAINT pk_producer PRIMARY KEY producer (producer_id)
);


CREATE TABLE director (
    director_id SMALLINT UNSIGNED AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
CONSTRAINT pk_director PRIMARY KEY(director_id)
);


CREATE TABLE streaming_platform (
    streaming_platform_id TINYINT UNSIGNED AUTO_INCREMENT NOT NULL,
    streaming_platform VARCHAR (30),
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
CONSTRAINT pk_streaming PRIMARY KEY(streaming_platform_id)
);


 CREATE TABLE actor(
    actor_id MEDIUMINT UNSIGNED AUTO_INCREMENT NOT NULL,
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    img_url BLOB,
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
CONSTRAINT pk_actor PRIMARY KEY(actor_id)
 );  


 CREATE TABLE program (
    movie_id MEDIUMINT UNSIGNED AUTO_INCREMENT NOT NULL,
    title VARCHAR (100) NOT NULL,
    rating ENUM('G','PG', 'PG-13', 'R', 'NC-17', 'NR') DEFAULT 'NR',
    runtime TIME, 
    nationality CHAR (3),
    yr_released YEAR,
    budget INT UNSIGNED,
    gross INT UNSIGNED,
    production_id SMALLINT UNSIGNED,
    showing ENUM('theater', 'direct-to-tv') DEFAULT 'theater',
    poster BLOB,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
CONSTRAINT pk_movie PRIMARY KEY(movie_id),
CONSTRAINT fk_production FOREIGN KEY(production_id) REFERENCES production (production_id)
 );  
 

CREATE TABLE program_to_streaming (
program_id MEDIUMINT UNSIGNED NOT NULL,
streaming_platform_id TINYINT UNSIGNED NOT NULL,
CONSTRAINT fk_prog_str FOREIGN KEY (program_id) REFERENCES program (program_id),
CONSTRAINT fk_str_prog FOREIGN KEY(streaming_platform_id) REFERENCES streaming_platform (streaming_platform_id)
);


CREATE TABLE program_to_actor (
    program_id MEDIUMINT UNSIGNED NOT NULL,
    actor_id MEDIUMINT UNSIGNED NOT NULL,
   CONSTRAINT fk_prog_act FOREIGN KEY (program_id) REFERENCES program (program_id),
CONSTRAINT fk_act_prog FOREIGN KEY(actor_id) REFERENCES actor (actor_id)
);


CREATE TABLE movie_to_genre (
movie_id MEDIUMINT UNSIGNED NOT NULL,
genre_id TINYINT UNSIGNED NOT NULL,
CONSTRAINT fk_mov_gen FOREIGN KEY (movie_id) REFERENCES movie (movie_id),
CONSTRAINT fk_gen_mov FOREIGN KEY(genre_id) REFERENCES genre (genre_id)
);

CREATE TABLE movie_to_director (
movie_id MEDIUMINT UNSIGNED NOT NULL,
director_id SMALLINT UNSIGNED NOT NULL,
CONSTRAINT fk_mov_dir FOREIGN KEY (movie_id) REFERENCES movie (movie_id),
CONSTRAINT fk_dir_mov FOREIGN KEY(director_id) REFERENCES director (director_id)
);






-- ALTERATIONS
ALTER TABLE genre
MODIFY COLUMN CONSTRAINT pk_genre PRIMARY KEY (genre_id);