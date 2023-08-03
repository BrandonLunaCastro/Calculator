/* Funciones Aritmeticas */
const isInteger = (num1,num2) =>  Number.isInteger(num1) && Number.isInteger(num2)

const suma = (n1,n2) => isInteger(n1,n2) ? n1 + n2 : (n1 + n2).toFixed(2) 

const resta = (n1,n2) => isInteger(n1,n2) ? n1 - n2 : (n1 - n2).toFixed(2); 

const multiplicacion = (n1,n2) => isInteger(n1,n2) ? n1 * n2 : (n1 * n2).toFixed(2); 

const division = (n1,n2) => isInteger(n1,n2) ? n1 / n2 :(n1 / n2).toFixed(2);

/* Segun el operando que se recibe esta funcion maneja que operacion aritmetica se ejecuta */
const operate  = (operate,n1,n2) => {
    let result
    
    switch (operate) {
        case '+':
        result = suma(n1,n2);
            break;
        case '-':
        result = resta(n1,n2);
            break;
        case '*' :
        result = multiplicacion(n1,n2);
            break;
        case '/' : 
            n2 === 0 ? result= 'no se puede dividir por 0' : result = division(n1,n2);
            break;
        default:
        result = 'Math Error';
            break;
    }   
    return result
}

let btns = document.querySelectorAll("button"),
    input = document.querySelector(".input"),
    output = document.querySelector(".output");
    console.log(input.innerText) 

let num1,
    operando,
    num2;
/* Este codigo que recibe los valores que pasara a la funcion operate , esta a su vez
actualiza el display de la calculadora */
const pintarDisplay = (valor) =>{ 
    if(input.innerText === "0" && !(valor === "clear" || valor === "Backspace") && !(valor === "=" || valor === "Enter")){ 
        console.log("entro")
        input.innerText = valor;
        num1 = valor;
    }else if(valor === "clear" || valor === "Backspace"){
        input.innerText = "0";
        output.innerText = " ";
        num1 = "0";
        operando = "";
        num2 = "";
        document.querySelector(".item-16").removeAttribute("disabled")
    }else if((valor === '='|| valor === "Enter" ) && num1 && !operando && !num2){
        num1 === '0' ? output.innerText = 'Math Error' : output.innerText = num1;
        document.querySelector(".item-16").removeAttribute("disabled")
    }else if(valor === "=" || valor === "Enter"){
     
        output.innerText = operate(operando,Number(num1),Number(num2));
        num1 = operate(operando,Number(num1),Number(num2));
        num2 = '';
        operando = "";
        document.querySelector(".item-16").removeAttribute("disabled")
    }else if((valor === "+" || valor === "-" || valor === "*" || valor === "/") && !operando ){
        input.innerText += valor;
        operando = valor;
        document.querySelector(".item-16").removeAttribute("disabled")
    }else if(!operando && !(valor == "undo")){
        input.innerText += valor;
        num1 += valor;
     
    }else if(operando && (valor === "+" || valor === "-" || valor === "*" || valor === "/" )){
        num1 = operate(operando,Number(num1),Number(num2));
        output.innerText = num1;
        operando = valor;
        input.innerText += valor;
        num2 = '';
    /* Esta condición analiza si ya existe un operando cargado en la variable y si el nuevo valor que se ingresa es otro operando, 
       entonces realiza la operación con los numeros dispuestos por el usuario y carga el nuevo operando mostrando en pantalla el
       resultado
    */   
    }else if(valor === 'undo'){
        let longitud = input.innerText,
            ultimo = longitud[longitud.length-1],
            compruebaNum = /\d|\./.test(ultimo) 
        longitud.length === 1 
            ?  input.innerText = 0 
            : input.innerText = longitud.slice(0,longitud.length-1);

        /*Esta pieza de codigo analiza , si el ultimo digito del display es un numero y si aun no se ha ingresado un operando 
         quiere decir que el numero presente pertenece al primer numero de la operacion, sino
         se comprueba que el ultimo sea uno de los operandos disponibles y en caso de ser limpia el operando actual
         tanto de display como de la variable, por ultimo en caso de no ser un simbolo se actualiza el valor 
         al segundo numero de la operacion */
        ultimo === "." ? document.querySelector(".item-16").removeAttribute("disabled") : "" ;

        compruebaNum && operando === undefined 
            ? num1 = num1.slice(0,num1.length-1)
            : /[+,-,/,*]/.test(ultimo) 
              ? operando = undefined 
              : num2 = num2.slice(0,num2.length-1);
    
    //      console.log(num1,operando,num2);
    }else{
        num2 === undefined ? num2 = valor : num2 += valor;
        input.innerText += valor;
    }
    
    console.log(num1,operando,num2);
        
}
/*  Esta función comprueba que el valor ingresado sea un punto y en caso de ser asi 
    verifica que el primer número tenga un punto , si lo tiene desabilita el boton para que no
    se repita dos veces en el mismo número, en caso de que no lo incluya eso quiere decir que
    se ha presionado la tecla "undo" la cual borra dígito por dígito de esta manera 
    habilita nuevamente el botón
*/
const compruebaComa = (valor) => {
    valor !== "."
     ? "" 
     : num1.includes(".") 
       ? document.querySelector(".item-16").setAttribute("disabled","") 
       : document.querySelector(".item-16").removeAttribute("disabled");
}
/* Esta parte captura los eventos de las teclas propias de la calculadora */
btns.forEach(btn => {
    btn.addEventListener("click",e => {
        let valor = e.target.value
          
        pintarDisplay(valor);   
        compruebaComa(valor)
    })
});

/* Esta parte del codigo captura eventos del teclado */
window.addEventListener("keydown", e  => {
    e.preventDefault()
    let numeros = /\d/ig,
        simbolos = /[+,/,*,.,-]/,
        access = /(Enter)|(Backspace)/
         if(numeros.test(e.key) || simbolos.test(e.key) || access.test(e.key)){
            pintarDisplay(e.key)
            compruebaComa(e.key)
         } 
})


