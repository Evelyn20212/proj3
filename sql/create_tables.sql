DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (

  id     SERIAL PRIMARY KEY, 
  firstname VARCHAR(250) NOT NULL,
  lastname  VARCHAR(250) NOT NULL,
  email     VARCHAR(250) NOT NULL,
  password  VARCHAR(100) NOT NULL,
  created TIME DEFAULT now()


);


