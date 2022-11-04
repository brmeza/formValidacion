// const inputNacimineto = document.querySelector("#birth")

// inputNacimineto.addEventListener("blur",(evento)=>{
//  validarNacimineto(evento.target);
// })

export function validar(input){
    const tipoDeInput= input.dataset.tipo;
    if (validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML=""
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML=mostrarMensajesDeError(tipoDeInput, input)
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

const mensajesDeError = {
    nombre: {
        valueMissing: "el campo nombre no puede estar vacio"
    },
    email: {
        valueMissing: "el campo email no puede estar vacio",
        typeMismatch: "el correo no es valido"
    },
    password:{
        valueMissing: "el campo contraseña no puede estar vacio",
        patternMismatch: 
        "Minimo 8 caracteres Maximo 15, Al menos una letra mayúscula, Al menos una letra minucula, Al menos un dígito, No espacios en blanco, Al menos 1 caracter especial"
    },
    nacimiento: {
        valueMissing: "este campo no puede estar vacio",
        customError: "debe tener al menos 18 años de edad"
    },
    numero: {
        valueMissing: "el campo numero no puede estar vacio",
        patternMismatch: "el fomrato requiero es XXX XXX XXXX 10 numero"
    },
    direccion: {
        valueMissing: "el campo numero no puede estar vacio",
        patternMismatch: "debe contener entre 10 a 40 caracteres"
    },
    ciudad: {
        valueMissing: "el campo numero no puede estar vacio",
        patternMismatch: "debe contener entre 10 a 40 caracteres"
    },
    estado: {
        valueMissing: "el campo numero no puede estar vacio",
        patternMismatch: "debe contener entre 10 a 40 caracteres"
    }

}

const validadores = {
    nacimiento: (input) => validarNacimineto(input),
};

function mostrarMensajesDeError (tipoDeInput, input){
    let mensaje=""
    tipoDeErrores.forEach((error) => {
        if(input.validity[error]){
           console.log(tipoDeInput, error);
           console.log(mensajesDeError[tipoDeInput][error]);
            mensaje=mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje
}

function validarNacimineto (input){
    const fechaCliente = new Date(input.value);
    let mensaje="";
    if(!mayorDeEdad(fechaCliente)){
        mensaje="debe tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear()+18,fecha.getUTCMonth(),fecha.getUTCDate())
    return diferenciaFechas<=fechaActual;
}