/* Funciones Aritmeticas */
const suma = (n1,n2) => n1 + n2;

const resta = (n1,n2) => n1 - n2; 

const multiplicacion = (n1,n2) =>  n1 * n2 ; 

const division = (n1,n2) => n1 / n2;

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

//funciones para mostrar los numeros en el display
let btns = document.querySelectorAll("button"),
    input = document.querySelector(".input"),
    output = document.querySelector(".output")
    
    console.log(input.innerText) 
let num1,
    operando,
    num2
const pintarDisplay = (valor) =>{ 
   
    if(input.innerText === "0" && !(valor === "clear")){
        input.innerText = valor
        num1 = valor
        num2 = ""
    }else if(valor === "clear"){
        input.innerText = "0"
        output.innerText = " "
        num1 = "0"
        operando = ""
        num2 = "0"
    }else if(valor === "="){
        input.innerText += " "
        output.innerText = operate(operando,Number(num1),Number(num2))
    }else if(valor === "+" || valor === "-" || valor === "*" || valor === "/" ){
        input.innerText += valor
        operando = valor
    }else if(!operando){
        input.innerText += valor
        num1 += valor 
    }else{
          input.innerText += valor
          num2 += valor
    }   
    
   /*    
    */
       console.log(num1,operando,num2)
}

btns.forEach(btn => {
    btn.addEventListener("click",e => {
        let valor = e.target.value
        pintarDisplay(valor)        
    })
});
