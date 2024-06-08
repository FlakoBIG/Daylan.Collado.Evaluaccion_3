import { RegistrarSoldado, obtenerReclutados } from "./promesas.js";
//Esto es para cuando la pagina cargue completamente se ejecute lo que este dentro
window.addEventListener("load",()=>{
    document.getElementById("BTNRegistrar").addEventListener("click",RegistrarRecluta);
    //se cargan los registrados
    CargarReclutas();
    
});
//tengo pensado asta ahora , primero pasar por las validaciones y que las propias validaciones le entreguen a el registrar , pero voy a empesar registrando ya que es lo 
//mas tardido , luego adaptare
//const Validaciones = ()=>{}

const RegistrarRecluta = ()=>{
    //esto es para ver si entramos
    console.log("Entre en registrarReclutas")
    //Primero se recuperan los elementos , por eso el nombre "ENombre" = ElementoNombre
    let ENombre = document.getElementById("INPNombre");
    let EApellido_1 = document.getElementById("INPApellido_1");
    let EApellido_2 = document.getElementById("INPApellido_2");
    let ERut = document.getElementById("INPRut");
    let EFecha = document.getElementById("INPFecha");
    let EEstudio_cursado = document.getElementById("SLTEstudio_cursado");
    let EAuto = document.getElementById("INPAuto");
    let EMoto = document.getElementById("INPMoto");
    let EAvion = document.getElementById("INPAvion");
    let ECamion = document.getElementById("INPCamion");
    let EMensaje = document.getElementById("Mensaje");
    let ESi = document.getElementById("INPSi");
    let ENo = document.getElementById("INPNo");

    //Segundo se optiene el valor de ese Elemento
    let VNombre = ENombre.value;
    let VApellido_1 = EApellido_1.value;
    let VApellido_2 = EApellido_2.value;
    let VRut = ERut.value;
    let VFecha = EFecha.value;
    let VEstudio_cursado = EEstudio_cursado.value;
    let VAuto = EAuto.checked;
    let VMoto = EMoto.checked;
    let VAvion = EAvion.checked;
    let VCamion = ECamion.checked;
    let VMensaje = EMensaje.value;
    let VSi = ESi.value;
    let VNo = ENo.value;
    let Manejo_armas="";
    if (VSi){Manejo_armas="Si"}else{Manejo_armas="No"}
    //Creamos la lista para los vehiculos que maneja
    let Lista_de_vehiculos = [];
    //ahora le metemos los vehiculos
    // si Vauto es true, a la lista se le integra "Auto"
    if (VAuto){Lista_de_vehiculos.push("Auto")};
    if (VMoto){Lista_de_vehiculos.push("Moto")};
    if (VAvion){Lista_de_vehiculos.push("Avion")};
    if (VCamion){Lista_de_vehiculos.push("Camion")};
    //revisamos la lista en consola
    console.log(Lista_de_vehiculos);
    //ahora se crea el objeto
    let Recluta = {Nombre:VNombre,Apellido_1:VApellido_1,Apellido_2:VApellido_2,Rut:VRut,Fecha_de_nacimiento:VFecha,
        Ultimo_Estudio_cursado:VEstudio_cursado,Maneja:Lista_de_vehiculos,Quire_entrar_porque:VMensaje,Manejo_de_armas:Manejo_armas}
    console.log(Recluta)
    //el then en este caso estaria imprimiendo el mensje "el Recluta...", 
    //pero mas que nada es para decir que se ejecuto bien
    RegistrarSoldado(Recluta).then(()=>{
        console.log("El Recluta se registro con exito")
        CargarReclutas();
    //el catch es para si algo se ejecuta mal mostrara ese mensaje
    }).catch((error)=>{
        alert("Algo paso , no se pudo registrar :c")
        console.log(error);
    })
}

//Ahora se cargara los Reclutas que estan registrados en la base
const CargarReclutas = ()=>{
    obtenerReclutados().then((Recluta)=>{
        console.log("Se recupero un Recluta");
        console.log(Recluta);
        //ahora se prepara la estructura para la tabla
        let Estructura = "";
        Recluta.forEach((Soldado)=>{
            Estructura += "<tr>";
            Estructura += "<td>"+Soldado.Nombre+"</td>";
            Estructura += "<td>"+Soldado.Apellido_1+"</td>";
            Estructura += "<td>"+Soldado.Apellido_2+"</td>";
            Estructura += "<td>"+Soldado.Rut+"</td>";
            Estructura += "<td>"+Soldado.Fecha_de_nacimiento+"</td>";
            Estructura += "<td>"+Soldado.Ultimo_Estudio_cursado+"</td>";
            Estructura += "<td>"+Soldado.Maneja+"</td>";
            Estructura += "<td>"+Soldado.Quire_entrar_porque+"</td>";
            Estructura += "<td>"+Soldado.Manejo_de_armas+"</td>";
            Estructura += "<td><button>"+"Actualizar</button><button>"+"Eliminar</button></td>"
            Estructura += "</tr>";
        });
        console.log(Estructura);
        //Este modifica el html para meterle la estrutura
        document.getElementById("Tabla_de_Reclutados").innerHTML = Estructura;
    })
}