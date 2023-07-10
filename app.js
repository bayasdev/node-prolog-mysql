const express = require('express');
const swipl = require('swipl');

const app = express();

// parse application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// consult prolog file
swipl.call('consult("program.pl")');

// connect db
swipl.call('connect_db');

// serve static files
app.use(express.static('public'));

// routes

// obtener personas
app.get('/personas', (req, res) => {
  const query = new swipl.Query('get_personas(X)');
  let ret = null;
  let toReturn = [];

  try {
    while ((ret = query.next())) {
      const nombre = ret.X.args[0];
      const edad = ret.X.args[1];
      toReturn.push({ nombre, edad });
    }
  } catch (error) {
    console.log(error);
  } finally {
    query.close();
  }

  return res.json(toReturn);
});

// insertar persona
app.post('/personas', (req, res) => {
  const nombre = req.body.nombre;
  const edad = req.body.edad;

  const query = new swipl.Query(`insert_persona(${nombre}, ${edad})`);
  query.next();
  query.close();

  return res.json({ nombre, edad });
});

// eliminar persona
app.delete('/personas', (req, res) => {
  const nombre = req.body.nombre;

  const query = new swipl.Query(`delete_persona(${nombre})`);
  query.next();
  query.close();

  return res.json({ nombre });
});

// ejecutar consulta en prolog
app.post('/query', (req, res) => {
  const query = req.body.query;

  // cargar personas en la base de conocimiento
  swipl.call('load_personas');

  const q = new swipl.Query(query);
  let ret = null;
  let toReturn = [];

  try {
    while ((ret = q.next())) {
      toReturn.push(ret);
    }
  } catch (error) {
    console.log(error);
  } finally {
    q.close();
  }

  return res.json(toReturn);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
