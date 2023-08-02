const suma = (n1,n2) => n1 + n2;

const resta = (n1,n2) => n1 - n2; 

const multiplicacion = (n1,n2) =>  n1 * n2 ; 

const division = (n1,n2) => n1 / n2;

let numberOne = 5,
    numberTwo = 5,
    operando = '+';


const operate  = (operate,n1,n2) => {
    let result
    switch (operate) {
        case '+':
        result = suma(n1,n2)
            break;
        case '-':
        result = resta(n1,n2)
            break;
        case '*' :
        result = multiplicacion(n1,n2)
            break;
        case '/' : 
        result = division(n1,n2)
            break;
        default:
        result = 'ingrese un operando valido'
            break;
    }   
    return result
}

console.log(operate('-',5,5))