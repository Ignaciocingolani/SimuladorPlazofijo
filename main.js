document.addEventListener("DOMContentLoaded", function () {
    const plazoFijoForm = document.getElementById("plazoFijoForm");

    plazoFijoForm.addEventListener("submit", function (event) {
        event.preventDefault();

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
                const resultado = calcularIntereses(monto, plazo, data);

                if (typeof resultado === 'number') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Resultado',
                        text: `Inversión de $${monto} a ${plazo} meses: Resultado = $${resultado.toFixed(2)}`,
                    });
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

    function calcularIntereses(monto, meses, data) {
        let resultado = 0;

        if (data.hasOwnProperty(meses)) {
            resultado = (monto * data[meses]) * meses;
        } else {
            resultado = "Por favor, seleccione un plazo válido.";
        }

        return resultado;
    }
});