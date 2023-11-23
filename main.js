document.addEventListener("DOMContentLoaded", function () {
    const plazoFijoForm = document.getElementById("plazoFijoForm");
    const historialLista = document.getElementById("historialLista");
    const resetHistorialBtn = document.getElementById("resetHistorialBtn");
    let historial = obtenerHistorialLocalStorage() || [];

    plazoFijoForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = plazoFijoForm.elements.nombre.value;
        const monto = parseFloat(plazoFijoForm.elements.monto.value);
        const plazo = parseInt(plazoFijoForm.elements.plazo.value);

        fetch('datos.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo completar la solicitud.');
                }
                return response.json();
            })
            .then(data => {
                const resultado = calcularIntereses(monto, plazo, data, nombre);

                if (typeof resultado === 'number') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Resultado',
                        text: `Inversión de $${monto} a ${plazo} meses: Resultado = $${resultado.toFixed(2)}`,
                    });

                    
                    historial.push({
                        nombre,
                        monto,
                        plazo,
                        resultado: resultado.toFixed(2)
                    });

                    
                    guardarHistorialLocalStorage(historial);

                    
                    mostrarHistorial();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: resultado,
                    });
                }
            })
            .catch(error => {
                console.error('Error en la solicitud fetch: ', error);
            });
    });

    resetHistorialBtn.addEventListener("click", function () {
        resetearHistorial();
    });

    function calcularIntereses(monto, meses, data, nombre) {
        let resultado = 0;

        if (data.hasOwnProperty(meses)) {
            resultado = (monto * data[meses]) * meses;
        } else {
            resultado = "Por favor, seleccione un plazo válido.";
        }

        return resultado;
    }

    function mostrarHistorial() {
        historialLista.innerHTML = "";
        for (const operacion of historial) {
            const nuevaEntrada = document.createElement("li");
            nuevaEntrada.textContent = `${operacion.nombre}: Inversión de $${operacion.monto} a ${operacion.plazo} meses: Resultado = $${operacion.resultado}`;
            historialLista.appendChild(nuevaEntrada);
        }
    }

    function guardarHistorialLocalStorage(historial) {
        localStorage.setItem('historialOperaciones', JSON.stringify(historial));
    }

    function obtenerHistorialLocalStorage() {
        const historialJSON = localStorage.getItem('historialOperaciones');
        return historialJSON ? JSON.parse(historialJSON) : null;
    }

    function resetearHistorial() {
        historial = [];
        guardarHistorialLocalStorage(historial);
        mostrarHistorial();
    }

    
    mostrarHistorial();
});