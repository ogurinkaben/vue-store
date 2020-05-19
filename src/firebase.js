import firebase from "firebase";
require("firebase/firestore");
require("firebase/storage");
const firebaseConfig = {
	// Get your API keys from https://firebase.google.com
};
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { fb, db }
