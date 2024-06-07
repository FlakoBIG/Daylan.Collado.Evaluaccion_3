
import { RegistrarRecluta, obtenerReclutados } from "./promesas";
//Esto es para cuando la pagina cargue completamente se ejecute lo que este dentro
window.addEventListener("load",()=>{
    document.getElementById("BTNRegistrar").addEventListener("click",RegistrarSoldado);
    CargarSoldados();
    
});
//tengo pensado asta ahora , primero pasar por las validaciones y que las propias validaciones le entreguen a el registrar , pero voy a empesar registrando ya que es lo 
//mas tardido , luego adaptare
//const Validaciones = ()=>{}

const RegistrarSoldado = ()=>{
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
    Manejo_armas="";
    if (VSi){manejo_armas +="Si"}
    //Creamos la lista para los vehiculos que maneja
    Lista_de_vehiculos = [];
    if (VAuto){Lista_de_vehiculos.push("Auto")};
    if (VMoto){Lista_de_vehiculos.push("Moto")};
    if (VAvion){Lista_de_vehiculos.push("Avion")};
    if (VCamion){Lista_de_vehiculos.push("Camion")};
    //revisamos la lista en consola
    console.log(Lista_de_vehiculos);
    //ahora se crea el objeto
    let Soldado = {Nombre:VNombre,Apellido_1:VApellido_1,Apellido_2:VApellido_2,Rut:VRut,Fecha_de_nacimiento:VFecha,
        Ultimo_Estudio_cursado:VEstudio_cursado,Maneja:Lista_de_vehiculos,Quire_entrar_porque:VMensaje,Manejo_de_armas:Manejo_armas}
    console.log(Soldado)
    RegistrarRecluta(Soldado).then(()=>{
        console.log("El soldado se registro con exito")
    })
}
const CargarSoldados = ()=>{
    obtenerReclutados().then((Soldado)=>{
        console.log("Se recupero un soldado");
        console.log(Soldado);
    })
    //ahora se prepara la estructura para la tabla
    let Estructura = "";
    Soldado.forEach(recluta => {
        Estructura += "<th>";
        Estructura += "<td>"+recluta.Nombre+"</td>";
        Estructura += "<td>"+recluta.Apellido_1+"</td>";
        Estructura += "<td>"+recluta.Apellido_2+"</td>";
        Estructura += "<td>"+recluta.Rut+"</td>";
        Estructura += "<td>"+recluta.Fecha_de_nacimiento+"</td>";
        Estructura += "<td>"+recluta.Ultimo_Estudio_cursado+"</td>";
        Estructura += "<td>"+recluta.Maneja+"</td>";
        Estructura += "<td>"+recluta.Quire_entrar_porque+"</td>";
        Estructura += "<td>"+recluta.Manejo_de_armas+"</td>";
        Estructura += "</th>";
    });
    console.log(Estructura)

}