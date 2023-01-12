const before = document.querySelector('.before');

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
