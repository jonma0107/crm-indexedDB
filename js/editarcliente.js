// import { imprimirAlerta } from "./nuevocliente.js";

(() => {

  let DB;
  let idCliente;
  const nombreInput = document.querySelector('#nombre');
  const emailInput = document.querySelector('#email');
  const telefonoInput = document.querySelector('#telefono');
  const empresaInput = document.querySelector('#empresa');

  const formulario = document.querySelector('#formulario');

  document.addEventListener('DOMContentLoaded', () => {
    conexionBD();

    // Verificar el ID de la URL
    const parametrosUrl = new URLSearchParams(window.location.search);
    idCliente = parametrosUrl.get('id');
    if (idCliente) {

      setTimeout(() => {
        obtenerCliente(idCliente);
      }, 100);
    }

    // ACTUALIZA EL FORMULARIO
    formulario.addEventListener('submit', actualizarCliente)
  });
  //*******************************  CONEXION A BD  *****************************/

  function conexionBD() {
    let conexionBD = window.indexedDB.open('crm', 1);
    conexionBD.onerror = () => {
      console.error('error');
    };
    conexionBD.onsuccess = () => {
      DB = conexionBD.result;
    };
  } // fin conexionBD

  //********************************  FUNCIONES  **********************************/
  function obtenerCliente(id) {
    const transaction = DB.transaction(['crm'], 'readwrite');
    const objectStore = transaction.objectStore('crm');

    const cliente = objectStore.openCursor();
    cliente.onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) {
        if (cursor.value.id === Number(id)) {
          llenarFormulario(cursor.value)
        }
        cursor.continue();
      }
    }
  };
  //**************************************************/

  function llenarFormulario(datosCliente) {
    const { nombre, email, telefono, empresa } = datosCliente;

    nombreInput.value = nombre;
    emailInput.value = email;
    telefonoInput.value = telefono;
    empresaInput.value = empresa;
  }
  //**************************************************/

  function actualizarCliente(e) {
    e.preventDefault();

    if (nombreInput.value === '' || emailInput.value === '' || telefonoInput.value === '' || empresaInput.value === '') {
      imprimirAlerta('Todos los campos deben estar llenos', 'error');
      return;
    }

    //Actualizar Cliente
    const clienteActualizado = {
      nombre: nombreInput.value,
      email: emailInput.value,
      telefono: telefonoInput.value,
      empresa: empresaInput.value,
      id: Number(idCliente)
    }

    const transaction = DB.transaction(['crm'], 'readwrite');
    const objectStore = transaction.objectStore('crm');

    objectStore.put(clienteActualizado);
    transaction.oncomplete = () => {
      imprimirAlerta('Editado satisfactoriamente');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 3000);
    }
    transaction.onerror = () => {
      imprimirAlerta('error al editar', 'error');
    }
  }



})()


