let mateBasica = require("./mate");
let prompt = require("prompt-sync")();

let opcion = Number(prompt(
`Operaciones: 1)Suma 2)Resta 3)Multiplicacion 4)Division 5)Modulo: `
));
let num1 = Number(prompt(`Ingrese el primer numero: `));
let num2 = Number(prompt(`Ingrese el segundo numero: `));

switch (opcion) {
  case 1:
    console.log(mateBasica.suma(num1, num2));
    break;
  case 2:
    console.log(mateBasica.resta(num1, num2));
    break;
  case 3:
    console.log(mateBasica.producto(num1, num2));
    break;
  case 4:
    console.log(mateBasica.division(num1, num2));
    break;
  case 5:
    console.log(mateBasica.modulo(num1, num2));
    break;
}
