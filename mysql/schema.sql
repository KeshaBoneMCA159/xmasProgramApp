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
    first_name VARCHAR(30),
    last_name VARCHAR(30),
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
    program_id BIGINT UNSIGNED AUTO_INCREMENT NOT NULL,
    title VARCHAR (100) NOT NULL,
    personal_rating TINYINT UNSIGNED,
    runtime TIME, 
    program_rating ENUM('G','PG', 'PG-13', 'R', 'NC-17', 'NR', 'TV-G', 'TV-PG', 'TV-14', 'TV-MA') DEFAULT 'NR',
    yr_released YEAR,
    format_id SMALLINT UNSIGNED,
    producer_id SMALLINT UNSIGNED,
    img_url BLOB,
    description TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
CONSTRAINT chk_personal_rating CHECK(personal_rating >= 1 AND personal_rating <= 10),
CONSTRAINT pk_program PRIMARY KEY(program_id),
CONSTRAINT fk_producer FOREIGN KEY(producer_id) REFERENCES producer (producer_id)
 );  
 

CREATE TABLE program_to_streaming (
program_id BIGINT UNSIGNED NOT NULL,
streaming_platform_id TINYINT UNSIGNED NOT NULL,
CONSTRAINT fk_prog_str FOREIGN KEY (program_id) REFERENCES program (program_id),
CONSTRAINT fk_str_prog FOREIGN KEY(streaming_platform_id) REFERENCES streaming_platform (streaming_platform_id)
);


CREATE TABLE program_to_actor (
program_id BIGINT UNSIGNED NOT NULL,
actor_id MEDIUMINT UNSIGNED NOT NULL,
CONSTRAINT fk_prog_act FOREIGN KEY (program_id) REFERENCES program (program_id),
CONSTRAINT fk_act_prog FOREIGN KEY(actor_id) REFERENCES actor (actor_id)
);

CREATE TABLE program_to_director (
program_id BIGINT UNSIGNED NOT NULL,
director_id SMALLINT UNSIGNED NOT NULL,
CONSTRAINT fk_prog_dir FOREIGN KEY (program_id) REFERENCES program (program_id),
CONSTRAINT fk_dir_prog FOREIGN KEY(director_id) REFERENCES director (director_id)
);



CREATE TABLE program_to_producer (
program_id BIGINT UNSIGNED NOT NULL,
producer_id SMALLINT UNSIGNED NOT NULL,
CONSTRAINT fk_prog_producer FOREIGN KEY (program_id) REFERENCES program (program_id),
CONSTRAINT fk_producer_prog FOREIGN KEY(producer_id) REFERENCES producer (producer_id)
);


-- ALTERATIONS
ALTER TABLE genre
MODIFY COLUMN CONSTRAINT pk_genre PRIMARY KEY (genre_id);

ALTER TABLE program
ADD COLUMN CONSTRAINT fk_streaming_platform FOREIGN KEY (streaming_platform_id) REFERENCES streaming_platform (streaming_platform_id);

CREATE TABLE streaming_platform (
    streaming_platform_id TINYINT UNSIGNED AUTO_INCREMENT NOT NULL,
    streaming_platform VARCHAR (30),
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
CONSTRAINT pk_streaming PRIMARY KEY(streaming_platform_id)
);