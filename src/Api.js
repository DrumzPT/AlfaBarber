import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

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