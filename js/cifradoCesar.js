let btnCopy = document.getElementById("btnCopy");
let btnCopyDiv = document.getElementById("buttonCopy-div");
let outputTextDiv = document.getElementById("outputText-container");
let emptyImage = document.getElementById("emptyImage");
let divTextoInformativo = document.getElementById("textoInformativo");
let h2Informativo   = "Ningun mensaje fue encontrado";
let spanInformativo = "Por favor, ingrese un mensaje para encriptar o desencriptar";

let alfabeto = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    ' ', '.', ',', ';', ':', '!', '?', '-', '_', '(', ')', '[', ']',
    '{', '}', '<', '>', '/', '\\', '|', '@', '#', '$', '%', '^', '&',
    '*', '+', '=', '~', '`', '\'', '\"', '\n',
    'á', 'é', 'í', 'ó', 'ú', 'Á', 'É', 'Í', 'Ó', 'Ú',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
];

// for (let i = 0; i < alfabeto.length; i++) {
//     console.log("indes: "+i+"  caracter "+alfabeto[i]);
// }

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

function encryptText() {
    let texto = getText("entradaTexto").trim();
    let tipoEncriptacion = parseInt(document.getElementById("tipoEncriptacion").value);
    let lineasEncriptadas = [];

    if(texto === ""){
        Swal.fire({
            title: 'Atencion!',
            text: 'Por favor, ingrese un texto para encriptar.',
            icon: 'error',
            confirmButtonText: 'Ok'
        }); 
    } else{
        texto = getText('entradaTexto').split('\n'); //dividir el texto en lineas
        for (let linea of texto) {
            let caracteres = linea.split('');//dividir la linea en caracteres
    
            let textoEncriptado = [];
    
            for (let j = 0; j < caracteres.length; j++) {
                let c = caracteres[j];
    
                let encontrado = false;
                for (let i = 0; i < alfabeto.length; i++) {
                    if (c == alfabeto[i]) {
                        // Calculamos la nueva posición del caracter encriptado, se usa mod para que no se salga del arreglo
                        let nuevaPosicion = ((i + tipoEncriptacion) % alfabeto.length);
                        textoEncriptado[j] = alfabeto[nuevaPosicion];
                        encontrado = true;
                        break;
                    }
                }
                if (!encontrado) {
                    textoEncriptado[j] = c; // Si el caracter no se encuentra en el alfabeto, se deja como está
                }
            }
            lineasEncriptadas.push(textoEncriptado.join(''));//unir los caracteres encriptados en una linea
        }
        cleanOutputText();
        hideImage();
        cleanInputText();
        setEncryptedText("salidaTexto",lineasEncriptadas.join('\n'));
    }
}



function decryptText() {
    let texto = getText("entradaTexto").trim();
    let tipoEncriptacion = parseInt(document.getElementById("tipoEncriptacion").value);
    let lineasEncriptadas = [];

    if (texto === "") {
        Swal.fire({
            title: 'Atencion!',
            text: 'Por favor, ingrese un texto para desencriptar.',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    } else {
        texto = getText('entradaTexto').split('\n'); //dividir el texto en lineas
        for (let linea of texto) {
            let caracteres = linea.split('');//dividir la linea en caracteres

            let textoEncriptado = [];

            for (let j = 0; j < caracteres.length; j++) {
                let c = caracteres[j];

                let encontrado = false;
                for (let i = 0; i < alfabeto.length; i++) {
                    if (c == alfabeto[i]) {
                        // Calculamos la nueva posición del caracter encriptado, se usa mod para que no se salga del arreglo
                        let nuevaPosicion = ((i - tipoEncriptacion) + alfabeto.length) % alfabeto.length;
                        textoEncriptado[j] = alfabeto[nuevaPosicion];
                        encontrado = true;
                        break;
                    }
                }
                if (!encontrado) {
                    textoEncriptado[j] = c; // Si el caracter no se encuentra en el alfabeto, se deja como está
                }
            }
            lineasEncriptadas.push(textoEncriptado.join(''));//unir los caracteres encriptados en una linea
        }
        let textoDesencriptado = lineasEncriptadas.join('\n');
        cleanOutputText();
        hideImage();
        cleanInputText();
        setEncryptedText("salidaTexto", textoDesencriptado);
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

