(() => {
  let DB;


  document.addEventListener('DOMContentLoaded', () => {
    crearBD();
    if (window.indexedDB.open('crm', 1)) {
      enlistarClientes();
    }
  })

  //*****************************  FUNCIONES  ************************** */

  function crearBD() {
    let crearBD = window.indexedDB.open('crm', 1);

    crearBD.onerror = () => {
      console.log('la base de datos no se ha creado');
    }

    crearBD.onsuccess = () => {
      DB = crearBD.result;
      console.log('base de datos creada');
    }

    crearBD.onupgradeneeded = (e) => {
      const bd = e.target.result;
      const objectStore = bd.createObjectStore('crm', {
        keyPath: 'id',
        autoIncrement: true
      });

      objectStore.createIndex('nombre', 'nombre', { unique: false });
      objectStore.createIndex('email', 'email', { unique: true });
      objectStore.createIndex('telefono', 'telefono', { unique: false });
      objectStore.createIndex('empresa', 'empresa', { unique: false });
      objectStore.createIndex('id', 'id', { unique: true });

      console.log('columnas creadas');
    }
  }; // fin crearBD

  // *******************************************************************************

  function enlistarClientes() {
    // abrir la conexion
    const abrirConexion = window.indexedDB.open('crm', 1);

    abrirConexion.onerror = () => {
      console.log('hubo un error');
    };

    abrirConexion.onsuccess = () => {
      DB = abrirConexion.result;
      const objectStore = DB.transaction('crm').objectStore('crm');
      // listar
      objectStore.openCursor().onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          const { nombre, email, telefono, empresa, id } = cursor.value;

          const listadoClientes = document.querySelector('#listado-clientes');
          // IMPORTANTE EL MAS IGUAL
          listadoClientes.innerHTML += `
            <tr>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                  <p class="text-sm leading-10 text-gray-700"> ${email} </p>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                  <p class="text-gray-700">${telefono}</p>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">
                  <p class="text-gray-600">${empresa}</p>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                  <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                  <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900">Eliminar</a>
              </td>
            </tr>
          `;

          cursor.continue();
          return;
        }
      }
    };
  }

})()
