import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  arrayUnion,
  arrayRemove,
  updateDoc
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { weekdaysSchedule } from './const/index'

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
      response = {success: false, errorMessage: handleFirebaseErrorMessages(error.code)}
    });
    return response
  },
  signOff: async () => {
    const auth = getAuth();
    let response
    await signOut(auth)
    .then(()=>{
      response= {success:true}
    })
    .catch((error) => {
      response= {success:false, errorMessage: error}
    })
    return response
  },
  updateUser: async (userName) => {
    const auth = getAuth();
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
      } )
      .catch((error)=>{
        response = {success: false, errorMessage: error}
      })
    return response
  },
  getServices: async () => {
    let response
    await getDocs(collection(db, "servicos"))
    .then((querySnapshot)=>{
      response = {success: true, result: querySnapshot}
    })
    .catch((error)=>{
      response = {success: false, errorMessage: error}
    })
    return response
  },
  getBarberAvailability: async (uid, date) => {
    let response
    await getDoc(doc (db, "barbeiros", uid, "availableBookings", date))
    .then(async (docSnapshot)=>{
      if(docSnapshot.exists()){
        response = {success: true, result: docSnapshot}
      }else{
        if(isAllowedToCreateAvailableBooking){
          createAvailableBooking(uid, date)
          response = {success: true, result: "created"}
        }
      }

    })
    .catch((error)=>{
      response = {success: false, errorMessage: error}
    })
    return response
  },
  removeBarberAvailability: async (uid, year, month, day, hoursToRemove)=>{
    let response
    console.log("ref =", `barbeiros/${uid}/availableBookings/${year}-${month}-${day}`)
    const ref = doc(db, `barbeiros/${uid}/availableBookings/${year}-${month}-${day}`)
    await getDoc(ref)
    .then((docSnapshot)=>{
      if(docSnapshot.exists()){
        updateDoc(ref, {
          hours: arrayRemove(...hoursToRemove)
        })
        response = {success: true}
      }else{
        response = {success: false, result: "not possible to book"}
      }
    })
    .catch((error)=>{
      response = {success: false, errorMessage: error}
    })
    return response
  },
  setUserReservation: async (email, service, barberName, year, month, day, hour) => {
    const serviceInfo =  {
      barberName: barberName,
      hour: hour,
      serviceName: service.name,
      servicePrice: service.price,
      serviceTimeBlocks: service.timeBlocks,
      hour: hour
    }
    let response;
    await addToListOfDays(`userBookings/${email}/${year}-${month}`, day)
    const ref = doc(db, `userBookings/${email}/${year}-${month}/${day}`)
    await getDoc(ref)
    .then(async (docSnapshot)=>{
      if(docSnapshot.exists()){
        updateDoc(ref, {
          services: arrayUnion(serviceInfo)
        })
      }else{
        await setDoc(doc(db, `userBookings/${email}/${year}-${month}/${day}`), {
          services: [serviceInfo]
        })
      }
      response = {success: true}
    })
    .catch((error)=>{
      response = {success: false, errorMessage: error}
    })
    return response;
  },
  setBarberReservation: async (barberId, service, clientName, year, month, day, hour, phoneNumber) => {
    const serviceInfo =  {
      clientName: clientName,
      hour: hour,
      serviceName: service.name,
      servicePrice: service.price,
      serviceTimeBlocks: service.timeBlocks,
      hour: hour,
      clientPhoneNumber: phoneNumber
    }
    let response;
    await addToListOfDays(`barberBookings/${barberId}/${year}-${month}`, day)
    const ref = doc(db, `barberBookings/${barberId}/${year}-${month}/${day}`)
    await getDoc(ref)
    .then(async (docSnapshot)=>{
      if(docSnapshot.exists()){
        updateDoc(ref, {
          services: arrayUnion(serviceInfo)
        })
      }else{
        await setDoc(ref, {
          services: [serviceInfo]
        })
      }
      response = {success: true}
    })
    .catch((error)=>{
      response = {success: false, errorMessage: error}
    })
    return response;
  },
  getUserBookingDays: async (email, month, year) => {
    const ref = doc(db, `userBookings/${email}/${year}-${month}/listOfDays`);
    let result = []
    await getDoc(ref)
    .then(async (docSnapshot)=>{
      if(docSnapshot.exists()){
        result = docSnapshot.data().reservationDays
      }
    })

    return result
  },
  getUserBookingsByDay: async (email, month, year, day) => {
    console.log(`userBookings/${email}/${year}-${month}/${day}`)
    const ref = doc(db, `userBookings/${email}/${year}-${month}/${day}`);
    let result = []
    await getDoc(ref)
    .then(async (docSnapshot)=>{
      console.log("DocSnapShot: ", docSnapshot)

      if(docSnapshot.exists()){
        console.log("document data", docSnapshot.data())
        result = docSnapshot.data().services
      }
    })
    return result
  },
  getBarberBookingDays: async (uid, month, year) => {
    const ref = doc(db, `barberBookings/${uid}/${year}-${month}/listOfDays`);
    let result = []
    await getDoc(ref)
    .then(async (docSnapshot)=>{
      if(docSnapshot.exists()){
        result = docSnapshot.data().reservationDays
      }
    })

    return result
  },
  getBarberBookingsByDay: async (uid, month, year, day) => {
    console.log(`barberBookings/${uid}/${year}-${month}/${day}`)
    const ref = doc(db, `barberBookings/${uid}/${year}-${month}/${day}`);
    let result = []
    await getDoc(ref)
    .then(async (docSnapshot)=>{
      console.log("DocSnapShot: ", docSnapshot)

      if(docSnapshot.exists()){
        console.log("document data", docSnapshot.data())
        result = docSnapshot.data().services
      }
    })
    return result
  },
  setUserNumber: async (email, number) => {
    const ref = doc(db, `userNumbers/${email}`)
    await setDoc(ref, {
      number: number
    })
  },
  getUserNumber: async (email) => {
    const ref = doc(db, `userNumbers/${email}`)
    let result = 0
    await getDoc(ref)
    .then(async (docSnapshot)=>{
      console.log("DocSnapShot: ", docSnapshot)

      if(docSnapshot.exists()){
        console.log("document data", docSnapshot.data())
        result = docSnapshot.data().number
      }
    })
    return result
  }
}

const addToListOfDays = async (path, day) => {
  const ref = doc(db, path, "listOfDays")
    await getDoc(ref)
    .then(async (docSnapshot)=>{
      if(docSnapshot.exists()){
        updateDoc(ref, {
          reservationDays: arrayUnion(day)
        })
      }else{
        await setDoc(doc(db, path, "listOfDays"), {
          reservationDays: [day]
        })
      }
    })
}

const isAllowedToCreateAvailableBooking = () => {
  //TODO Feriados, Ferias, Fins de Semana?
  return true
}

const createAvailableBooking = async (uid, date) => {
  await setDoc(doc (db, "barbeiros", uid, "availableBookings", date),{
    hours: weekdaysSchedule
  })
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