// get personas
function getPersonas() {
  fetch('/personas')
    .then((res) => res.json())
    .then((data) => {
      const personas = data.map((p) => `<li>${p.nombre} - ${p.edad}</li>`);
      document.getElementById('personas').innerHTML = personas.join('');
    });
}

getPersonas();

// create new persona
function createPersona() {
  const nombre = document.getElementById('nombre').value;
  const edad = document.getElementById('edad').value;

  fetch('/personas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre, edad }),
  }).then(() => location.reload());
}

// delete persona
function deletePersona() {
  const nombre = document.getElementById('nombreEliminar').value;

  fetch('/personas', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre }),
  }).then(() => location.reload());
}

// ejecutar consulta y mostrar resultado
function executeQuery() {
  const query = document.getElementById('query').value;

  fetch('/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById('resultado').innerHTML = JSON.stringify(
        data,
        null,
        4
      );
    });
}
