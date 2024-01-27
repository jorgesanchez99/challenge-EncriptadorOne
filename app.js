let btnCopy = document.getElementById("btnCopy");
let btnCopyDiv = document.getElementById("buttonCopy-div");
let outputTextDiv = document.getElementById("outputText-container");
let emptyImage = document.getElementById("emptyImage");

/* 
!Expresion regular:
!verifica si la cadena de texto comienza y termina con una o más letras minúsculas y espacios en blanco, sin permitir otros caracteres.

* `^` indica el inicio de la cadena.
* `[a-z\s]` define un conjunto de caracteres permitidos. En este caso, `[a-z]` representa todas las letras minúsculas del alfabeto y `\s` representa un espacio en blanco.
* `+` indica que el conjunto de caracteres permitidos puede repetirse una o más veces.
* `$` indica el final de la cadena.

*/

// validateButtonCopy();
validateOutputText();

function validateText() {
    let texto = document.getElementById("entradaTexto").value;
    let regex = /^[a-z\s]+$/; // Expresión regular para validar minúsculas sin caracteres especiales ni acentos
    

    /*
    !Se usara para reemplazar: texto.replace(/[^a-z\s]/g, '').toLowerCase();
    * `[^a-z\s]` define un conjunto de caracteres no permitidos. En este caso, `[^a-z]` representa todos los caracteres que no sean letras minúsculas del alfabeto y `\s` representa un espacio en blanco.
    *La g al final de la expresión regular indica que se debe realizar una búsqueda global, es decir, buscar y reemplazar todas las coincidencias en lugar de detenerse después de la primera coincidencia.
    */

    if (!regex.test(texto)) {
        // El texto no es válido, contiene mayúsculas, caracteres especiales o acentos
        document.getElementById("entradaTexto").value = texto.replace(/[^a-z\s]/g, '').toLowerCase();
    }
    
}

function encryptText(){
    let texto = getText("entradaTexto");
    cleanInputText();

    // Encriptar texto
    texto = texto.replace(/e/g, "enter");
    texto = texto.replace(/i/g, "imes");
    texto = texto.replace(/a/g, "ai");
    texto = texto.replace(/o/g, "ober");
    texto = texto.replace(/u/g, "ufat");

    setEncryptedText("salidaTexto",texto);
    btnCopy.textContent = "Copiar";
    validateOutputText();
}

function decryptText(){
    let texto = getText("entradaTexto");
    cleanInputText();

    // Desencriptar texto
    texto = texto.replace(/enter/g, "e");
    texto = texto.replace(/imes/g, "i");
    texto = texto.replace(/ai/g, "a");
    texto = texto.replace(/ober/g, "o");
    texto = texto.replace(/ufat/g, "u");

    setEncryptedText("salidaTexto",texto);
    btnCopy.textContent = "Copiar";
    validateOutputText();
}

function copyText(){
    let texto = getText("salidaTexto");
    navigator.clipboard.writeText(texto); // Copiar texto al portapapeles
    cleanOutputText();
    btnCopy.textContent = "Copiado";
    // validateOutputText();
    
}

// function validateButtonCopy(){
//     let texto = getText("salidaTexto");
//     if(texto != ""){
//         btnCopy.disabled = false;
//     }else{
//         btnCopy.disabled = true;
//     }

// }

function cleanInputText(){
    document.getElementById("entradaTexto").value = "";
    //document.getElementById("salidaTexto").value = "";
}

function cleanOutputText(){
    document.getElementById("salidaTexto").value = "";
}

function setEncryptedText(element, text) {
    const inputElement = document.getElementById(element);
    let index = 0;

    //sirve para que el texto se escriba letra por letra
    function typeNextCharacter() {
        if (index < text.length) {
            inputElement.value += text.charAt(index);
            index++;
            setTimeout(typeNextCharacter, 50); 
        }
    }

    typeNextCharacter();
}


function getText(elemento){
    let texto = document.getElementById(elemento).value;
    return texto;
}

function validateOutputText() {
    let salidaTexto = getText("salidaTexto");

    if (salidaTexto === "") {
        // emptyImage.classList.remove("image-out");
        emptyImage.classList.add("image-in"); 
        btnCopyDiv.style.display = "none"; // Ocultar el botón de copiar
        outputTextDiv.style.display = "none"; // Ocultar el textarea
        emptyImage.style.display = "block";
    } else {
        /* 
            *En este caso, la función addEventListener se utiliza para escuchar
            *un evento específico en el elemento emptyImage.
            *El evento que se está escuchando es "animationend", que se
            *dispara cuando una animación en el elemento emptyImage ha finalizado.
        */
        emptyImage.classList.remove("image-in");
        // emptyImage.classList.add("image-out");
        emptyImage.style.display = "none";
            btnCopyDiv.style.display = "flex";
            outputTextDiv.style.display = "block";  
        // emptyImage.addEventListener("animationend", function() {
        //     emptyImage.style.display = "none";
        //     btnCopyDiv.style.display = "flex";
        //     outputTextDiv.style.display = "block"; 
        // // emptyImage.classList.add("animation-out"); 
        // });
    }
}


function encryptText2() {
    let alfabeto = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        ' ', '.', ',', ';', ':', '!', '?', '-', '_', '(', ')', '[', ']', '{', '}', '<', '>', '/', '\\', '|', '@', '#', '$', '%', '^', '&', '*', '+', '=', '~', '`', '\'', '\"', '\n'
    ]

    let tipoEncriptacion = 3;
    let texto = getText('entradaTexto').split('\n'); //dividir el texto en lineas
    
    let lineasEncriptadas = [];

    for (let linea of texto) {
        let caracteres = linea.split('');//dividir la linea en caracteres

        let textoEncriptado = [];

        for (let j = 0; j < caracteres.length; j++) {
            let c = caracteres[j];

            for (let i = 0; i < alfabeto.length; i++) {
                if (c === alfabeto[i]) {
                    // Calculamos la nueva posición del caracter encriptado, se usa mod para que no se salga del arreglo
                    let nuevaPosicion = (i + tipoEncriptacion) % alfabeto.length;
                    textoEncriptado[j] = alfabeto[nuevaPosicion];
                    break;
                }
            }
        }
        lineasEncriptadas.push(textoEncriptado.join(''));//unir los caracteres encriptados en una linea
    }

    document.getElementById("salidaTexto").value = lineasEncriptadas.join('\n');
}
