// Llaves de encriptacion a usar
// `La letra "e" es convertida para "enter"`
// `La letra "i" es convertida para "imes"`
// `La letra "a" es convertida para "ai"`
// `La letra "o" es convertida para "ober"`
// `La letra "u" es convertida para "ufat"`

//Ejemplos de la implementacoón de las llaves
// "gato" => "gaitober"
// gaitober" => "gato"

//Mensaje secreto:
//fenterlimescimesdaidenters poberr enternfrenterntair enterstenter dentersaifimesober y haibenterrlober cobernclufatimesdober cobern enterximestober!


const encriptar = document.getElementById("btn__encriptar");
const desencriptar = document.getElementById("btn__desencriptar");
const copy = document.getElementById("btn__copiar");
const textoInicial = document.getElementById("textoInput");
const textFinal = document.getElementById("textoFinal");
const muneco = document.getElementById("muneco");
const textInfo = document.getElementById("textoInfo");
const rigth = document.getElementById("rigth")
const recarga = document.getElementById("recargar");
recarga.style.visibility= "hidden";
const loader = document.getElementById("loader");


function validarTexto(){
    let textoEscrito = textoInicial.value;
    let validador = /^[a-z ]*$/.test(textoEscrito);

    if (!validador) {
        Swal.fire({
            title: '¡Oups!, Lo siento',
            text: 'Solo son permitidas letras minúsculas, sin acentos y espacios  ¡Intenta de nuevo!',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: 'LightSeaGreen'
        }).then((result) => {
            if (result.isConfirmed) {
                reset(); 
            }
        });
        return true; 
    }
	return false;
}

// Función para mostrar el overlay y recargar la página
function Recargar() {
    Swal.fire({
        title: 'Nuevo Intento',
        text: 'La página se recargará',
        icon: 'warning',
        timer: 1300,
        showConfirmButton: false,
        willClose: () => {
            // Mostrar el overlay con la imagen
            const overlay = document.getElementById('overlay');
            overlay.classList.add('overlay-visible'); // Agrega la clase para mostrar el overlay

            // Ocultar el overlay después de 3 segundos y luego recargar la página
            setTimeout(() => {
                overlay.classList.remove('overlay-visible'); // Quita la clase para ocultar el overlay
                // Recargar la página
                location.reload();
            }, 3000); // Muestra la imagen durante 3 segundos
        }
    });
}

// Evento click para el botón de reset
document.getElementById('recargar').addEventListener('click', Recargar);


const remplace = (newvalue) => {
	textFinal.innerHTML = newvalue;
	textFinal.classList.add("ajustar");
	rigth.classList.add("ajuste")
	textoInicial.value = "";
	textoInicial.style.height = "auto"
	textoInicial.placeholder = "Ingrese el texto aquí";
	muneco.classList.add("ocultar");
	textInfo.classList.add("ocultar");
	copy.classList.remove("btn_ocultar");
	textoInicial.focus();
}

const reset = (preserveTextoInicial = false) => {
    if (!preserveTextoInicial) {
        textoInicial.value = ""; // Limpia 'textoInicial' solo si 'preserveTextoInicial' es false
    }
    textoInicial.style.height = "auto";
	textFinal.innerHTML = "";
	rigth.classList.remove("ajuste")
	textFinal.classList.remove("ajustar");
	muneco.classList.remove("ocultar");
	textFinal.placeholder = "Ningún mensaje fue encontrado";
	textInfo.classList.remove("ocultar")
	copy.classList.add("btn_ocultar");
	textoInicial.focus();
};

let remplazar = [
	["e", "enter"],
	["o", "ober"],
	["i", "imes"],
	["a", "ai"],
	["u", "ufat"]
];

encriptar.addEventListener('click', () => {

	const texto = textoInicial.value.toLowerCase();

	if (texto === "") {
		loader.style.display="block";
        Swal.fire({
            title: 'Atención!',
            text: 'No has ingresado texto',
            icon: 'warning',
            // timer: 1500,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: 'LightSeaGreen'
        })
		.then((result) => {
            if(result.isConfirmed){
				loader.style.display = "none"; 
				setTimeout(() => {
					textoInicial.focus(); // Coloca el cursor en el textinicio
				}, 400); // Aumenta el retraso si es necesario para tiempo al navegador y de focus
			}
        }); 
    }
    else{
        if(!validarTexto()) {
			function encript(newtext) {
				for (let i = 0; i < remplazar.length; i++) {
					if (newtext.includes(remplazar[i][0])) {
						newtext = newtext.replaceAll(remplazar[i][0], remplazar[i][1]);
					};
				};
				return newtext;
			};
		remplace(encript(texto));
		recarga.style.visibility = "visible";
		
		} 
	}
});


desencriptar.addEventListener('click', () => {

	const texto = textoInicial.value.toLowerCase();

	if (texto === "") {
		loader.style.display="block";
        Swal.fire({
            title: 'Atención!',
            text: 'No has ingresado texto',
            icon: 'warning',
            // timer: 1500,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: 'LightSeaGreen'
        })
		.then((result) => {
            if(result.isConfirmed){
				loader.style.display="none";
				setTimeout(() => {
					textoInicial.focus(); 
				}, 400); 
			}
        }); 
    }
    else{
        if(!validarTexto()) {
		function desencript(newtext) {
			for (let i = 0; i < remplazar.length; i++) {
				if (newtext.includes(remplazar[i][1])) {
					newtext = newtext.replaceAll(remplazar[i][1], remplazar[i][0]);
				};
			};
			return newtext;
		};
		remplace(desencript(texto));
		recarga.style.visibility = "visible";
	} 
	}
});

copy.addEventListener("click", () => {
	textoInicial.value=textFinal.textContent; //manejo manual por si falla navigator

		Swal.fire({
			title: '¡Hola!',
			text: 'Texto Copiado y Transferido para Encriptar o Desencriptar',
			icon: 'success', 
			confirmButtonText: 'Aceptar',
			confirmButtonColor: 'LightSeaGreen',
		});   
		reset(true);
});

//No funciona en dispositivo móvil

// copy.addEventListener("click", () => {
// 		// textoInicial.value=textFinal.textContent; //manejo manual por si falla navigator

// 	navigator.clipboard.writeText(textFinal.textContent) // Copia el texto de 'textFinal' al portapapeles
// 		.then(() => {
// 			return navigator.clipboard.readText(); // Una vez copiado el texto, leerlo del portapapeles y pegarlo en 'textoInicial'
// 		})
// 		.then(texto => {
// 			textoInicial.value = texto; // Pega el texto copiado en 'textoInicial'

// 			Swal.fire({
// 				title: '¡Hola!',
// 				text: 'Texto Copiado y Transferido para Encriptar o Desencriptar',
// 				icon: 'success', 
// 				confirmButtonText: 'Aceptar',
// 				confirmButtonColor: 'LightSeaGreen',
// 			});   
// 			reset(true);
// 		})
// 	.catch(err => {
// 		console.error('Error al copiar o pegar el texto: ', err);
// 	});
// });