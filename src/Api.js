import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAldVS063ATeVDSDsC3hV8Ddw2Wz5WQC4s",
  authDomain: "alfabarber-a0012.firebaseapp.com",
  projectId: "alfabarber-a0012",
  storageBucket: "alfabarber-a0012.appspot.com",
  messagingSenderId: "199621609370",
  appId: "1:199621609370:web:b59d05975d23aa57119c23",
  measurementId: "G-QYHNV5X1ER"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export default {
  signUp: async (email,password) => {
    const auth = getAuth();
    let response
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      response = {success: true, user: user}
    })
    .catch((error) => {
      console.log(error.code)
      response = {success: false, errorMessage: handleFirebaseErrorMessages(error.code)}
    });
    return response
  },
  signIn: async (email,password) => {
    const auth = getAuth();
    let response
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      response = {success: true, user: user}
    })
    .catch((error) => {
      console.log(error.code)
      response = {success: false, errorMessage: handleFirebaseErrorMessages(error.code)}
    });
    return response
  },
  updateUser: async (userName) => {
    const auth = getAuth();
    console.log(auth.currentUser)
    updateProfile(auth.currentUser, {displayName: userName})
  },
  getBarbers: async () => {
    let response
    //Barbers foto should be the name of the image thats in the cloud
    await getDocs(collection(db, "barbeiros"))
    .then((querySnapshot)=>{
      response = {success: true, result: querySnapshot}
    })
    .catch((error)=>{
      response = {success: false, errorMessage: error}
    })
    return response
  },
  getBarberPic: async (picName) => {
    let response
    await getDownloadURL(ref(storage, picName))
      .then((url) => {
        response = {success: true, result: url}
        console.log(url)
      } )
      .catch((error)=>{
        response = {success: false, errorMessage: error}
      })
    return response
  }
}


const handleFirebaseErrorMessages = (errorCode) => {
  switch(errorCode) {
    case "auth/invalid-email":
      return "E-mail inválido"
    case "auth/weak-password":
      return "A palavra passe tem de ter no mínimo 7 caracteres"
    case "auth/email-already-in-use":
      return "Já existe uma conta com esse email associado"
    case "auth/wrong-password":
      return "Palavra passe incorrecta"
    case "auth/user-not-found":
      return "Ainda não existe conta para o e-mail fornecido"
    default:
      return "Erro na criação de conta, por favor tente mais tarde"
  }
}