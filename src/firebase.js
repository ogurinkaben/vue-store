import firebase from "firebase";
require("firebase/firestore");
require("firebase/storage");
const firebaseConfig = {
	apiKey: "AIzaSyDjvYAsudUDr3Lstj4pIPjVBJD3MAy8Mlw",
	authDomain: "airpods-store.firebaseapp.com",
	databaseURL: "https://airpods-store.firebaseio.com",
	projectId: "airpods-store",
	storageBucket: "airpods-store.appspot.com",
	messagingSenderId: "283799788743",
	appId: "1:283799788743:web:f7f4badc3a644d7ba332e2",
	measurementId: "G-64VWK3DTKC"
};
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { fb, db }
