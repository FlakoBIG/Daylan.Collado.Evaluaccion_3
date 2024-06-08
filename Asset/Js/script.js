import { RegistrarSoldado, eliminarSoldado, obtenerReclutados ,acualizarSoldado } from "./promesas.js";
//Esto es para cuando la pagina cargue completamente se ejecute lo que este dentro
window.addEventListener("load",()=>{
    document.getElementById("Cambiar_contraste").addEventListener("click",Cambiar_colores);
    document.getElementById("BTNRegistrar").addEventListener("click",D_R);
    document.getElementById("BTNAyuda_Rut").addEventListener("click",Ayuda_Rut);
    //se cargan los registrados
    CargarReclutas();
    document.getElementById("BTNActualizar").addEventListener("click",D_A);
    //vehiculos y nose conduccir 
    // si algun input Cambia , se llama al correspondiente
    document.getElementById("INPNo_se_conducir").addEventListener("change",Quitar_los_demas_autos);
    document.getElementById("INPAuto").addEventListener("change",Quitar_no_se_manejar);
    document.getElementById("INPMoto").addEventListener("change",Quitar_no_se_manejar);
    document.getElementById("INPAvion").addEventListener("change",Quitar_no_se_manejar);
    document.getElementById("INPCamion").addEventListener("change",Quitar_no_se_manejar);
});
//diferenciador de actualizar y registrar para las validaciones
const D_A = ()=>{Validaciones("Actualizar");}
const D_R = ()=>{Validaciones("Registrar");}

//validaciones 
const Validaciones = (Para)=>{
    //esto es para validar que todas se cumplieron
    let Vali_Vacio = false;
    let Vali_armas = false;
    let Vali_Vehiculos = false;
    let Vali_estudios = false;
    let Vali_longitud = false;
    //primero validamos vacios
    Validar_Vacio('INPNombre');
    Validar_Vacio('INPApellido_1');
    Validar_Vacio('INPApellido_2');
    Validar_Vacio('INPRut');
    Validar_Vacio('INPFecha');
    Validar_Vacio_Estudios('SLTEstudio_cursado');
    Validar_Vacio_Vehiculos('INPAuto','INPMoto','INPAvion','INPCamion','INPNo_se_conducir');
    Validar_Vacio('INPMensaje');
    Validar_Vacio_armas('INPSi','INPNo');
    function Validar_Vacio(IDCampo){
        //se obtiene el campo que se desea validar
        let Campo = document.getElementById(IDCampo);
        //se obtienen el value
        let VCampo = Campo.value;
        if(VCampo.trim()==""){
            Vali_Vacio = false;
            //el input ahora tiene borde de color rojo
            Campo.style.borderColor = "red";
            let Vacio_Mensaje = document.getElementById("Vacio_"+IDCampo);
            Vacio_Mensaje.style.display = "block";
        }else{
            Vali_Vacio = true;
            Campo.style.borderColor = "green";
            let Vacio_Mensaje = document.getElementById("Vacio_"+IDCampo);
            Vacio_Mensaje.style.display = "none";
            //pasando la primera validacion, si es el rut pasa a ver su longitud
            if(IDCampo = "INPRut"){ValidarLongitud(IDCampo)}
        }
    }
    function Validar_Vacio_armas(Rad1,Rad2){
        //se optienen los radios
        let Radio1 = document.getElementById(Rad1);
        let Radio2 = document.getElementById(Rad2);
        //si el radio 1 no esta marcado ni tampoco el radio2
        if(!Radio1.checked && !Radio2.checked){
            Vali_armas = false;
            Radio1.style.borderColor = "red";
            Radio2.style.borderColor = "red";
            let Vacio_Mensaje = document.getElementById("Vacio_INPArmas");
            Vacio_Mensaje.style.display = "block";
        }else{
            Vali_armas = true;
            Radio1.style.borderColor = "green";
            Radio2.style.borderColor = "green";
            let Vacio_Mensaje = document.getElementById("Vacio_INPArmas");
            Vacio_Mensaje.style.display = "none";
        }
    }
    function Validar_Vacio_Vehiculos(chek1,chek2,chek3,chek4,chek5){
        //se obtienen los checkbox
        let checkbox1 = document.getElementById(chek1);
        let checkbox2 = document.getElementById(chek2);
        let checkbox3 = document.getElementById(chek3);
        let checkbox4 = document.getElementById(chek4);
        let checkbox5 = document.getElementById(chek5);
        console.log("estoy validando el vacio de los vehiculos")
        // si no esta marcado ninguno 
        if(!checkbox1.checked &&!checkbox2.checked&&!checkbox3.checked&&!checkbox4.checked&&!checkbox5.checked){
            Vali_Vehiculos = false;
            checkbox1.style.borderColor = "red";
            checkbox2.style.borderColor = "red";
            let Vacio_Mensaje = document.getElementById("Vacio_INPVehiculos");
            Vacio_Mensaje.style.display = "block";}
        else{
            // pero encambio si se marca almenos 1 
            Vali_Vehiculos = true;
            checkbox1.style.borderColor = "green";
            checkbox2.style.borderColor = "green";
            let Vacio_Mensaje = document.getElementById("Vacio_INPVehiculos");
            Vacio_Mensaje.style.display = "none";}
    }
    function Validar_Vacio_Estudios(IDCampo){
        //se recupera el estudio
        let Campo = document.getElementById(IDCampo);
        console.log("Estoy validando el vacio de los estudios");
        //si el value de el estudio siguie siendo "seleccionar..." es porque no a selecionado ninguno
        console.log(Campo.value);
        if(Campo.value == "Seleccionar.."){
            Vali_estudios = false;
            Campo.style.borderColor = "red";
            Campo.style.borderColor = "red";
            let Vacio_Mensaje = document.getElementById("Vacio_SLTEstudio_cursado");
            Vacio_Mensaje.style.display = "block";
            Campo.value="Seleccionar.."}
        else{
            //encambio ahora que si selecciono uno pasa esto 
            Vali_estudios = true;
            Campo.style.borderColor = "green";
            Campo.style.borderColor = "green";
            let Vacio_Mensaje = document.getElementById("Vacio_SLTEstudio_cursado");
            Vacio_Mensaje.style.display = "none";}
        }
    function ValidarLongitud(Campo){
        //pasando la validacion de si esta vacio ahora se valida la longitud
        console.log("Ahora estoy validando la longitud del rut")
        //primero se obtiene el rut
        let Rut = document.getElementById(Campo);
        console.log(Campo);
        //se obtiene el valor del rut
        let VRut = Rut.value;
        console.log(VRut)
        //se compara si lo ingresado , la cantidad de caracteres es diferente a 9 , esporque no esta bien ingresao
        if(VRut.length !=9){
            Vali_longitud = false;
            Rut.style.borderColor = "red";
            Rut.style.borderColor = "red";
            let Vacio_Mensaje = document.getElementById("Vacio_INPRut.2");
            Vacio_Mensaje.style.display = "block";}
        else{
            //encambio cuando lo ingrese bien se el da el visto bueno
            Vali_longitud = true;
            Rut.style.borderColor = "green";
            Rut.style.borderColor = "green";
            let Vacio_Mensaje = document.getElementById("Vacio_INPRut.2");
            Vacio_Mensaje.style.display = "none";}
        }
    
    if(Vali_Vacio&&Vali_armas&&Vali_Vehiculos&&Vali_estudios&&Vali_longitud){
        if(Para == "Registrar"){RegistrarRecluta();}
        if(Para == "Actualizar"){ActualizarRecluta();}
    }
    }
// es una alerta para cuando el usuario nesesite ayuda al momento de ingresar el rut
const Ayuda_Rut=()=>{
    alert("Sin puntos ni guion y si termina en K replasalo por un 0")
}

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
    let ENo_se_coduccir = document.getElementById("INPNo_se_conducir");
    let EMensaje = document.getElementById("INPMensaje");
    let ESi = document.getElementById("INPSi");

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
    let VNo_se_coduccir = ENo_se_coduccir.checked;
    let VMensaje = EMensaje.value;
    let VSi = ESi.checked;
    console.log(VSi);
    //una lista para decir si maneja o no armas
    let Manejo_armas="";
//si Vsi es true , entonses es porque si maneja armas , pero si es false , entonses es porque no
    if(VSi){Manejo_armas="Si"}else{Manejo_armas="No"}
    //Creamos la lista para los vehiculos que maneja
    let Lista_de_vehiculos = [];
    //ahora le metemos los vehiculos
    // si Vauto es true, a la lista se le integra "Auto"
    if (VAuto){Lista_de_vehiculos.push("Auto")};
    if (VMoto){Lista_de_vehiculos.push("Moto")};
    if (VAvion){Lista_de_vehiculos.push("Avion")};
    if (VCamion){Lista_de_vehiculos.push("Camion")};
    if (VNo_se_coduccir){Lista_de_vehiculos.push("No se conduccir")};
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
            //estos dos botones estan juntos para poder usar un campo en la tabla, el de "opciones" 
            Estructura += "<td><button id='ACT"+Soldado.id+"'>Actualizar</button><button id='ELI"+Soldado.id+"'>Eliminar</button></td>"
            Estructura += "</tr>";
        });
        console.log(Estructura);
        //Este modifica el html para meterle la estrutura
        document.getElementById("Tabla_de_Reclutados").innerHTML = Estructura;
        Recluta.forEach((Soldado)=>{
            let Boton_actualizar = document.getElementById("ACT"+Soldado.id);
            Boton_actualizar.addEventListener("click",()=>{
                document.getElementById("INPNombre").value = Soldado.Nombre;
                document.getElementById("INPApellido_1").value = Soldado.Apellido_1;
                document.getElementById("INPApellido_2").value = Soldado.Apellido_2;
                document.getElementById("INPRut").value = Soldado.Rut;
                document.getElementById("INPFecha").value = Soldado.Fecha_de_nacimiento;
                document.getElementById("SLTEstudio_cursado").value = Soldado.Ultimo_Estudio_cursado;
                
                //Conduce
                //si en la lista de lo que maneja el soldado tiene Auto, el checked del auto se activara pero si no , sera se desactivara esto para evitar que queden marcados las de otro usuario
                if((Soldado.Maneja).includes("Auto")){document.getElementById("INPAuto").checked = true}else{document.getElementById("INPAuto").checked = false}
                if((Soldado.Maneja).includes("Moto")){document.getElementById("INPMoto").checked = true}else{document.getElementById("INPMoto").checked = false}
                if((Soldado.Maneja).includes("Avion")){document.getElementById("INPAvion").checked = true}else{document.getElementById("INPAvion").checked = false}
                if((Soldado.Maneja).includes("Camion")){document.getElementById("INPCamion").checked = true}else{document.getElementById("INPCamion").checked = false}
                document.getElementById("INPMensaje").value = Soldado.Quire_entrar_porque;
                // si manejo armas es si , el checkt de si se marca y si no , se marca el No
                if(Soldado.Manejo_de_armas == "Si"){
                    document.getElementById("INPSi").checked = true;
                }else{
                    document.getElementById("INPNo").checked = true;
                }
                //El boton actualizar ahora tiene el id del soldado que se esta actualizando
                document.getElementById("BTNActualizar").value = Soldado.id;
            })
            //Eliminar Recluta de la base de datos
            let Boton_eliminar = document.getElementById("ELI"+Soldado.id);
            console.log(Recluta)
            Boton_eliminar.addEventListener("click",()=>{
                if(confirm("Quieres eliminar al Recluta"+Soldado.Nombre+" "+Soldado.Apellido_1+" "+Soldado.Apellido_2)){
                    eliminarSoldado(Soldado.id).then(()=>{
                        alert("El Recluta se elimino de la base de datos")
                        CargarReclutas();
                    }).catch((error)=>{
                        //esto es para ver el error , por si pasa algo
                        console.log(error)
                        })
                }else{alert("uff casi , El Recluta\n"+Soldado.Nombre+" "+Soldado.Apellido_1+" "+Soldado.Apellido_2+"\n sigue en el campo de batalla")}
            })
        })
    })
}
//actualizar los reclutas que esten en la base de datos
const ActualizarRecluta=()=>{
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
    let ENo_se_coduccir = document.getElementById("INPNo_se_conducir");
    let EMensaje = document.getElementById("INPMensaje");
    let ESi = document.getElementById("INPSi");

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
    let VNo_se_coduccir = ENo_se_coduccir.checked;
    let VMensaje = EMensaje.value;
    let VSi = ESi.checked;
    console.log(VSi);
    //una lista para decir si maneja o no armas
    let Manejo_armas="";
//si Vsi es true , entonses es porque si maneja armas , pero si es false , entonses es porque no
    if(VSi){Manejo_armas="Si"}else{Manejo_armas="No"}
    //Creamos la lista para los vehiculos que maneja
    let Lista_de_vehiculos = [];
    //ahora le metemos los vehiculos
    // si Vauto es true, a la lista se le integra "Auto"
    if (VAuto){Lista_de_vehiculos.push("Auto")};
    if (VMoto){Lista_de_vehiculos.push("Moto")};
    if (VAvion){Lista_de_vehiculos.push("Avion")};
    if (VCamion){Lista_de_vehiculos.push("Camion")};
    if (VNo_se_coduccir){Lista_de_vehiculos.push("No se conduccir")};
    //revisamos la lista en consola
    console.log(Lista_de_vehiculos);
    //ahora se crea el objeto
    let ACTSoldado = {Nombre:VNombre,Apellido_1:VApellido_1,Apellido_2:VApellido_2,Rut:VRut,Fecha_de_nacimiento:VFecha,
        Ultimo_Estudio_cursado:VEstudio_cursado,Maneja:Lista_de_vehiculos,Quire_entrar_porque:VMensaje,Manejo_de_armas:Manejo_armas}
    console.log(ACTSoldado)
    let id = document.getElementById("BTNActualizar").value;
    console.log(id);
    document.getElementById("BTNActualizar").disabled = "True";
    acualizarSoldado(ACTSoldado,id).then(()=>{
        alert ("El Recluta se a actualizado")
        CargarReclutas()
        document.getElementById("BTNActualizar").disabled = "";
    }).catch((e)=>{
        console.log(e);
    })
    
}
const Quitar_los_demas_autos = ()=>{
    const Elemento = document.getElementById('Vehiculos');
    console.log(Elemento);
    const cheket = document.getElementById("INPNo_se_conducir");
    if(cheket.checked){Elemento.style.display = "none"}
    else{Elemento.style.display = "inline"}
};
const Quitar_no_se_manejar = ()=>{
    const Elemento = document.getElementById('Div_No_se_conducir');
    console.log(Elemento);
    //se obtienen los checkboxes
    let EAuto = document.getElementById("INPAuto");
    let EMoto = document.getElementById("INPMoto");
    let EAvion = document.getElementById("INPAvion");
    let ECamion = document.getElementById("INPCamion");
    //esto hace si alguno de los autos esta marcado , el div que contiene al no se conduccir es none , para que no pueda marcarlo
    if(EAuto.checked||EMoto.checked||EAvion.checked||ECamion.checked){Elemento.style.display = "none"}
    //siesque ninguno esta marcado , vuelve a ser visible
    else{Elemento.style.display = "inline"}
}
const Cambiar_colores = ()=>{
    console.log("Se va a cambiar el contraste");
    //se obtiene body 
    const Elemento = document.getElementById("body");
    //se elimina la clase contraste_default
    console.log(Elemento.classList)
    if(Elemento.classList == "Contraste_default"){
        //se remueve el contraste defaul
        Elemento.classList.remove("Contraste_default")
        //se le pone el Contraste_negro
        Elemento.classList.add("Contraste_negro")
    }else{
        //se remueve el Contraste_negro
        Elemento.classList.remove("Contraste_negro")
        //se le pone el Contraste_default
        Elemento.classList.add("Contraste_default")
    }
    //se le agrega la nueva clase
}