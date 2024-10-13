window.addEventListener('load', function(){

    // referenciar controles de pantalla
    const msgSuccess = this.document.getElementById('msgSuccess');

    // recuperar nombre de usuario
    const result = JSON.parse(this.localStorage.getItem('result'));

    // mostrar nombre de usuario en alerta
    mostrarAlerta(`Bienvenido ${result.nombreUsuario}`);
    
    const btnCerrarSesion = this.document.getElementById('btnCerrarSesion');
    btnCerrarSesion.addEventListener('click', function(){
        cerrarSesion();
    })

});

function mostrarAlerta(mensaje) {
    msgSuccess.innerHTML = mensaje;
    msgSuccess.style.display = 'block';
}

async function cerrarSesion(){

    const url = 'http://localhost:8082/login/cerrar-sesion';
    const request = {
        tipoDocumento: localStorage.getItem("tipoDocumento"),
        numeroDocumento: localStorage.getItem("numeroDocumento"),
    };

    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        const result = await response.json();
        console.log('Respuesta del servidor: ', result);

        if(result.resultado){
            localStorage.clear()
            window.location.replace("index.html")
        }else{
            console.log("Error: "+ result.mensaje);
        }
    }catch(error){
        console.log('Error al cerrar sesion', error);
    }
}