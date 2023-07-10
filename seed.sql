-- Drop the table if it exists
DROP TABLE IF EXISTS personas;

-- Create the new table
CREATE TABLE personas (
  nombre VARCHAR(255) NOT NULL,
  edad INT NOT NULL
);

-- Insert some data
INSERT INTO personas (nombre, edad)
VALUES ('roberto', 95),
       ('isabel', 87),
       ('ana', 57),
       ('marcelo', 61),
       ('martin', 37),
       ('sara', 32),
       ('matias', 5),
       ('estefano', 2),
       ('amalia', 48),
       ('oscar', 37),
       ('andrea', 34),
       ('esteban', 17),
       ('tiziana', 5);
