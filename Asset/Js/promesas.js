import {collection,addDoc,getDocs,doc,deleteDoc,updateDoc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {db} from "./firebase.js";

//esto es para registrar Reclutas a la base de datos
export const RegistrarSoldado = async(Recluta)=>{
    //const docRef = await addDoc(collection(db,"Recluta"),Recluta);
}
//esto para obtener los Reclutas que se registraron en la base de datos
export const obtenerReclutados = async()=>{
    //const ref = collection(db,"Recluta");
    const querySnap = await getDocs(ref);
    let lista = [];
    querySnap.forEach(doc =>{
        //lee cada uno de los documentos que estan en firebase
        lista.push({...doc.data(),id:doc.id});
    });
    return lista
}
//esto es para actualizar los reclutas que esten en la base de datos
export const acualizarSoldado = async(ACTSoldado,id)=>{
    const ref = doc(db,"Recluta",id);
    await updateDoc(ref,ACTSoldado);
}
//esto es para eliminar los reclutas que esten en la base de datos
export const eliminarSoldado = async(id)=>{
    const ref = doc(db,"Recluta",id);
    await deleteDoc(ref);
}