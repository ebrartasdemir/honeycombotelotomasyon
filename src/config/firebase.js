import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCbih7C01MimS-PdYBjCC9Cn26-pCAAoHQ",
  authDomain: "honeycomb-2bb72.firebaseapp.com",
  projectId: "honeycomb-2bb72",
  storageBucket: "honeycomb-2bb72.appspot.com",
  messagingSenderId: "490173019898",
  appId: "1:490173019898:web:713cf64b1848eaa13dbb43",
  measurementId: "G-NBB4ZQC2DL"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app)