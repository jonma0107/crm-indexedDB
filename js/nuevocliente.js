(() => {
  let DB;
  const formulario = document.querySelector('#formulario');
  const before = document.querySelector('.before')

  document.addEventListener('DOMContentLoaded', () => {
    conexionBD();
    formulario.addEventListener('submit', validarCliente);
  });

  //***************************  FUNCIONES  *************************/

  function conexionBD() {
    let conexionBD = window.indexedDB.open('crm', 1);
    conexionBD.onerror = () => {
      console.error('error');
    };
    conexionBD.onsuccess = () => {
      DB = conexionBD.result;
    };
  } // fin conexionBD
  //******************************************************************/

  function validarCliente(e) { // cómo es un submit va a tomar 'e'
    e.preventDefault();

    // leer todos los inputs
    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const telefono = document.querySelector('#telefono').value;
    const empresa = document.querySelector('#empresa').value;

    if (nombre === '' || email === '' || telefono === '' || empresa === '') {
      imprimirAlerta('Todos los campos deben estar llenos', 'error');
      return;
    };

    // crear un objeto con la informacion
    const clienteObj = {
      nombre,
      email,
      telefono,
      empresa,
      id: Date.now()
    }

    crearNuevoCliente(clienteObj);

  };
  //******************************************************************/

  function imprimirAlerta(mensaje, tipo) {

    const alerta = document.querySelector('.alerta')

    if (!alerta) {

      // crear la alerta
      const divAlerta = document.createElement('div');
      divAlerta.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'mb-3', 'text-center', 'border', 'alerta');
      // validar color de alerta
      if (tipo === 'error') {
        divAlerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
      } else {
        divAlerta.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
      }

      divAlerta.textContent = mensaje;

      document.querySelector('#formulario').insertBefore(divAlerta, before); // insertar el mensaje en HTML

      setTimeout(function () {
        divAlerta.remove();
      }, 3000)

    }

  }; // fin imprimirAlerta
  //******************************************************************/

  function crearNuevoCliente(cliente) {
    const transaction = DB.transaction(['crm'], 'readwrite');
    const objectStore = transaction.objectStore('crm'); // habilitar el objectStore
    objectStore.add(cliente);
    transaction.onerror = () => {
      imprimirAlerta('Hubo un error', 'error');
    }
    transaction.oncomplete = () => {
      imprimirAlerta('Cliente agregado satisfactoriamente');
      setTimeout(() => {
        window.location.href = 'index.html'
      }, 3000)
    }

  }; // fin crearNuevoCliente



})()
