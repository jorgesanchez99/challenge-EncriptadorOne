let btnCopy = document.getElementById("btnCopy");
let btnCopyDiv = document.getElementById("buttonCopy-div");
let outputTextDiv = document.getElementById("outputText-container");
let emptyImage = document.getElementById("emptyImage");
let divTextoInformativo = document.getElementById("textoInformativo");
let h2Informativo   = "Ningun mensaje fue encontrado";
let spanInformativo = "Por favor, ingrese un mensaje para encriptar o desencriptar";

/* 
!Expresion regular:
!verifica si la cadena de texto comienza y termina con una o más letras minúsculas y espacios en blanco, sin permitir otros caracteres.

* `^` indica el inicio de la cadena.
* `[a-z\s]` define un conjunto de caracteres permitidos. En este caso, `[a-z]` representa todas las letras minúsculas del alfabeto y `\s` representa un espacio en blanco.
* `+` indica que el conjunto de caracteres permitidos puede repetirse una o más veces.
* `$` indica el final de la cadena.

*/

initialImageStyles();
setInitialText();

function validateText() {
    let texto = document.getElementById("entradaTexto").value;
    let regex = /^[a-z\s]+$/; 
    

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
    let texto = getText("entradaTexto").trim();
    
    if(texto === ""){
        Swal.fire({
            title: 'Atencion!',
            text: 'Por favor, ingrese un texto para encriptar.',
            icon: 'error',
            confirmButtonText: 'Ok'
        }); 
    } else{
        cleanOutputText();
        hideImage();
        cleanInputText();

        // Encriptar texto
        texto = texto.replace(/e/g, "enter");
        texto = texto.replace(/i/g, "imes");
        texto = texto.replace(/a/g, "ai");
        texto = texto.replace(/o/g, "ober");
        texto = texto.replace(/u/g, "ufat");
        
        setEncryptedText("salidaTexto",texto);
        btnCopy.textContent = "Copiar";
        
    }

    
}

function decryptText(){
    let texto = getText("entradaTexto");
    
    if(texto === ""){
        Swal.fire({
            title: 'Atencion!',
            text: 'Por favor, ingrese un texto para desencriptar.',
            icon: 'error',
            confirmButtonText: 'Ok'
        }); 
    } else{
        cleanOutputText();
        hideImage();
        cleanInputText();

        // Desencriptar texto
        texto = texto.replace(/enter/g, "e");
        texto = texto.replace(/imes/g, "i");
        texto = texto.replace(/ai/g, "a");
        texto = texto.replace(/ober/g, "o");
        texto = texto.replace(/ufat/g, "u");

        setEncryptedText("salidaTexto",texto);
        btnCopy.textContent = "Copiar";
    }
}

function copyText(){
    let texto = getText("salidaTexto");
    navigator.clipboard.writeText(texto); // Copiar texto al portapapeles
    cleanOutputText();
    Swal.fire({
        title: 'Texto copiado!',
        text: 'El texto se ha copiado al portapapeles.',
        icon: 'success',
        confirmButtonText: 'Ok'
    });
    showImage();
}


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


function initialImageStyles(){
    btnCopyDiv.classList.add('remove'); 
    outputTextDiv.classList.add('remove');
    emptyImage.classList.add('addBlock'); 
    emptyImage.classList.add("image-in");
    divTextoInformativo.classList.add('addBlock');
}

function showImage(){
    
    outputTextDiv.classList.remove('addBlock');
    outputTextDiv.classList.add('remove');

    btnCopyDiv.classList.remove('addFlex');
    btnCopyDiv.classList.add('remove');

    divTextoInformativo.classList.remove('remove');
    divTextoInformativo.classList.add('addBlock');
    
    emptyImage.classList.remove("remove");
    emptyImage.classList.add('addBlock');
    emptyImage.classList.add("image-in");
    return;
}

function hideImage(){
   
    btnCopyDiv.classList.remove('remove');
    outputTextDiv.classList.remove('remove');

    emptyImage.classList.remove('addBlock');
    emptyImage.classList.add('remove');

    btnCopyDiv.classList.add('addFlex');
    outputTextDiv.classList.add('addBlock');

    divTextoInformativo.classList.remove('addBlock');
    divTextoInformativo.classList.add('remove');
}



function setInitialText() {
    typeText("h2Informativo", h2Informativo, 80);
    typeText("spanInformativo", spanInformativo, 80);

}

function typeText(elementId, text, delay) {
    const element = document.getElementById(elementId);
    let index = 0;

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, delay);
        }
    }

    type();
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


 /* 
    *En este caso, la función addEventListener se utiliza para escuchar
    *un evento específico en el elemento emptyImage.
    *El evento que se está escuchando es "animationend", que se
    *dispara cuando una animación en el elemento emptyImage ha finalizado.
*/