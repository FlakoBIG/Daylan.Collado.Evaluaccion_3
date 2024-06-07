import {collection} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
import {db} from "firebase.js";

//esto es para registrar soldados a la base de datos
export const RegistrarRecluta = async(Recluta)=>{
    const docRef = await addDoc (collection(db,"Recluta"),Recluta)
}
//esto para obtener los soldados que se registraron en la base de datos
export const obtenerReclutados = async()=>{}