CREATE DATABASE recycling;
CREATE USER biza@localhost IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON recycling.* TO biza@localhost;
FLUSH PRIVILEGES;

CREATE TABLE workers
(
   id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   names VARCHAR(15) NOT NULL
   );

CREATE TABLE locations
(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  latitude decimal(9,6)NOT NULL,
  longitude decimal(9,6),
  description VARCHAR(100)
);

CREATE TABLE jobs
(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  workers_id int NOT NULL,
  location_id int,
  title VARCHAR(15),
  description VARCHAR(100),
  job_status VARCHAR(30),
  comments VARCHAR(100),
  FOREIGN KEY (workers_id) REFERENCES workers(id),
  FOREIGN KEY (location_id) REFERENCES locations(id)
);