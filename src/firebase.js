import firebase from "firebase/compat";

const firebaseConfig = {
  apiKey: "AIzaSyBnfBcR77n4URrn2dv-vWnJAIiJwtQCX9M",
  authDomain: "ityme-4f997.firebaseapp.com",
  databaseURL: "https://ityme-4f997-default-rtdb.firebaseio.com",
  projectId: "ityme-4f997",
  storageBucket: "ityme-4f997.appspot.com",
  messagingSenderId: "207933413299",
  appId: "1:207933413299:web:1a2ddeb7cc96f810739dc6",
  measurementId: "G-5H798PNV5Z"
  // apiKey: "AIzaSyBpIys_Eke7q-cT8Oc-cOsdOIcLh-5_zyI",
  // authDomain: "sellerdb-b3f72.firebaseapp.com",
  // projectId: "sellerdb-b3f72",
  // storageBucket: "sellerdb-b3f72.appspot.com",
  // messagingSenderId: "331859779520",
  // appId: "1:331859779520:web:40fe7533974943c479b225"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection("users").add({
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  auth.signOut();
  alert("signedout");
};
export {
  auth,
  db,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
};
export default firebase;