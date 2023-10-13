

const saludar = (nombre) => {
    alert("¡Hola, " + nombre + "! Bienvenido al simulador de plazos fijos");
};


saludar(prompt("Ingresa tu nombre."));


const inversiones = []; 
function calculadorInteres() {
    do {
        const inversion = {}; 
        inversion.monto = parseFloat(prompt("Ingresa monto a invertir"));
        inversion.meses = parseInt(prompt("Ingresa cantidad de meses a invertir; 6, 12, 18, 24"));
        inversion.resultado = intereses(inversion.monto, inversion.meses);
        inversiones.push(inversion); 
        alert(`Quieres invertir ${inversion.monto} pesos con una ganancia total de ${inversion.resultado}`);
    } while (confirm("¿Deseas realizar otra operación?"));

    
    document.write("<h2>Resumen de inversiones:</h2>");
    for (const inversion of inversiones) {
        document.write(`Inversión de $${inversion.monto} a ${inversion.meses} meses: Resultado = $${inversion.resultado}<br>`);
    }
}

function intereses(monto, meses) {
    let resultado = 0;
   
    switch (meses) {
        case 6:
            resultado = ((monto * 0.1) * 6).toFixed(2);
            break;
        case 12:
            resultado = ((monto * 0.2) * 12).toFixed(2);
            break;
        case 18:
            resultado = ((monto * 0.3) * 18).toFixed(2);
            break;
        case 24:
            resultado = ((monto * 0.5) * 24).toFixed(2);
            break;
        default:
            alert("Por favor, ingrese 6, 12, 18 o 24 meses.");
            break;
    }

    return resultado;
}

calculadorInteres();