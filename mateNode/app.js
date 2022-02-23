let mateBasica = require("./mate");
let prompt = require("prompt-sync")();

let opcion = prompt(
  `Operaciones: 1)Suma 2)Resta 3)Multiplicacion 4)Division 5)Modulo
`
);
let num1 = prompt(`Ingrese el primer numero
`);
let num2 = prompt(`Ingrese el segundo numero
`);

switch (Number(opcion)) {
  case 1:
    console.log(mateBasica.suma(Number(num1), Number(num2)));
    break;
  case 2:
    console.log(mateBasica.resta(Number(num1), Number(num2)));
    break;
  case 3:
    console.log(mateBasica.producto(Number(num1), Number(num2)));
    break;
  case 4:
    console.log(mateBasica.division(Number(num1), Number(num2)));
    break;
  case 5:
    console.log(mateBasica.modulo(Number(num1), Number(num2)));
    break;
}
