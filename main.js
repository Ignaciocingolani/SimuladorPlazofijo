const saludar = (nombre) =>
alert ("Bienvenido "+ nombre + " al simulador de plazos fijos");

saludar( prompt("Ingresa tu nombre."));

let valor = 0;
let meses = 0;
let otraOperacion = false;


function calculadorInteres () {
    do{
        valor= parseInt(prompt("Ingresa monto a invertir"));
        meses= parseInt(prompt("Ingresa cantidad de meses a invertir; 6, 12, 18, 24"));
        intereses (0.1, 0.2, 0.3, 0.5);
        otraOperacion= confirm( "Deseas realizar otra operacion?");
    } while (otraOperacion);

}

function intereses (seis, doce, dieciocho, veinticuatro) {
    let resultado = 0;
    let mensaje = " ";
   
   
    switch (meses) {
        case 6:
            resultado = ((valor * seis) *6).toFixed(2);
            mensaje = `Quieres invertir ${valor} pesos con una ganancia total de ${resultado}`;
            break;

        case 12:
            resultado = ((valor * doce) *12).toFixed(2);
            mensaje = `Quieres invertir ${valor} pesos con una ganancia total de ${resultado}`;
            break;

        case 18:
            resultado = ((valor * dieciocho) *18).toFixed(2);
            mensaje = `Quieres invertir ${valor} pesos con una ganancia total de ${resultado}`;
            break;

        case 24:
            resultado = ((valor * veinticuatro) *24).toFixed(2);
            mensaje = `Quieres invertir ${valor} pesos con una ganancia total de ${resultado}`;
            break;


        default:
            mensaje = "Por favor ingrese 6, 12, 18 o 24 meses.";
            break;

    }
    
document.write(`${mensaje}<br>`);

}

calculadorInteres ();