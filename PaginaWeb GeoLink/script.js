window.addEventListener("scroll", function() {
    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});






// DATOS (puedes ampliarlos después)
const datos = {
    hidalgo: {
        Apan: ["Alcanfor","Alcantarillas","Apan","La Laguna","Lomas del Pedregal","Los Reyes","La Virgencita","Santa Cruz", 
               "San Diego Tlalayote", "San Lucas","San Miguel","San Sebastian", "Tecorral",],
        Almoloya: ["Ocotepec"],
        Emiliano_Zapata: ["Emiliano Zapata","Santa Clara", "San Jose", "Santa Barbara"],
        Tepeapulco: ["Irolo"]
    },
    
    EdoMex:{
        Axapusco:["Jaltepec"]
    }

    
};

// Cargar municipios
function cargarMunicipios() {
    const estado = document.getElementById("estado").value;
    const municipio = document.getElementById("municipio");

    municipio.innerHTML = '<option value="">Selecciona municipio</option>';

    if (estado && datos[estado]) {
        for (let m in datos[estado]) {
            municipio.innerHTML += `<option value="${m}">${m}</option>`;
        }
    }

    // reset comunidad
    document.getElementById("comunidad").innerHTML = '<option>Selecciona comunidad</option>';
}

// Cargar comunidades
function cargarComunidades() {
    const estado = document.getElementById("estado").value;
    const municipio = document.getElementById("municipio").value;
    const comunidad = document.getElementById("comunidad");

    comunidad.innerHTML = '<option value="">Selecciona comunidad</option>';

    if (estado && municipio) {
        datos[estado][municipio].forEach(c => {
            comunidad.innerHTML += `<option value="${c}">${c}</option>`;
        });
    }
}

function consultarCobertura() {
    const comunidad = document.getElementById("comunidad").value;
    const resultado = document.getElementById("resultado");

    if (!comunidad) {
        resultado.innerHTML = "⚠️ Selecciona tu comunidad";
        return;
    }

    if (coberturaTotal.includes(comunidad)) {
        resultado.innerHTML = `✅ Cobertura disponible en ${comunidad}
        <br><br>
        <button onclick="enviarWhats('${comunidad}')" class="btn">
            Contratar ahora
        </button>`;
    } 
    else if (coberturaParcial.includes(comunidad)) {
        resultado.innerHTML = `⚠️ Cobertura parcial en ${comunidad}
        <br><br>
        <button onclick="enviarWhats('${comunidad}')" class="btn">
            Consultar por WhatsApp
        </button>`;
    } 
    else {
        resultado.innerHTML = `❌ Sin cobertura en ${comunidad}
        <br><br>
        <button onclick="enviarWhats('${comunidad}')" class="btn">
            Solicitar factibilidad
        </button>`;
    }
}

const coberturaTotal = [
    "Tecorral",
    "Los Reyes",  
    "San Miguel", 
    "Alcanfor",  
    "San Diego Tlalayote",  
    "San Lucas",  
    "Santa Clara",  
    "San Jose",  
    "Santa Barbara",
    "Irolo",  
    "La Virgencita",  
    "Santa Cruz",  
    "Alcantarillas",  
    "La Laguna"
];

const coberturaParcial = [
    "Apan",
    "Lomas del Pedregal",
    "Emiliano Zapata",
    "Ocotepec",
    "Jaltepec",
    "San Sebastian"
];

// WhatsApp
function enviarWhats(zona) {
    const mensaje = encodeURIComponent(
        "Hola, quiero saber si hay cobertura en: " + zona
    );

    window.open("https://wa.me/5217751304548?text=" + mensaje, "_blank");
}




const formContratar = document.getElementById("formContratar");

if (formContratar) {

    formContratar.addEventListener("submit", function(e) {

        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const telefono = document.getElementById("telefono").value;
        const correo = document.getElementById("correo").value;
        const comunidad = document.getElementById("comunidad").value;
        const plan = document.getElementById("plan").value;
        const direccion = document.getElementById("direccion").value;

        const mensaje = encodeURIComponent(
            "📡 NUEVA SOLICITUD GEOLINK\n\n" +
            "Nombre: " + nombre + "\n" +
            "Teléfono: " + telefono + "\n" +
            "Correo: " + correo + "\n" +
            "Comunidad: " + comunidad + "\n" +
            "Plan: " + plan + "\n" +
            "Dirección: " + direccion + "\n" +
            "Ubicación: " + (ubicacionUsuario || "No proporcionada")
        );

        const url = "https://wa.me/5217757578815?text=" + mensaje;

        window.open(url, "_blank");

    });

}

let ubicacionUsuario = "";

function obtenerUbicacion() {
    const texto = document.getElementById("ubicacionTexto");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                ubicacionUsuario = `https://www.google.com/maps?q=${lat},${lon}`;

                texto.innerHTML = "✅ Ubicación obtenida";
            },
            function() {
                texto.innerHTML = "❌ No se pudo obtener la ubicación";
            }
        );
    } else {
        texto.innerHTML = "❌ Tu navegador no soporta geolocalización";
    }
}



// desplegar FAQ
function toggleFAQ(elemento) {
    elemento.classList.toggle("activo");
}

// diagnóstico
function diagnosticar() {
    const problema = document.getElementById("problema").value;
    const resultado = document.getElementById("resultado");

    if (problema === "sin_internet") {
        resultado.innerHTML = "Reinicia tu router y espera 5 minutos.";
    } 
    else if (problema === "lento") {
        resultado.innerHTML = "Reduce dispositivos conectados y acércate al router.";
    } 
    else if (problema === "intermitente") {
        resultado.innerHTML = "Revisa cables y posibles interferencias.";
    } 
    else {
        resultado.innerHTML = "Selecciona un problema.";
    }
}




const formContacto = document.getElementById("formContacto");

if (formContacto) {

    formContacto.addEventListener("submit", function(e) {

        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const telefono = document.getElementById("telefono").value;
        const correo = document.getElementById("correo").value;
        const mensajeTexto = document.getElementById("mensaje").value;

        const mensaje = encodeURIComponent(
            "📩 CONTACTO GEOLINK\n\n" +
            "Nombre: " + nombre + "\n" +
            "Teléfono: " + telefono + "\n" +
            "Correo: " + correo + "\n" +
            "Mensaje: " + mensajeTexto
        );

        window.open(
            "https://wa.me/5217751304548?text=" + mensaje,
            "_blank"
        );

    });

}