import {getFirestore} from "firebase/firestore"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLuCCtnq3quME94WpaHNSjfQXibAXUzXA",
  authDomain: "thek9store-f61b2.firebaseapp.com",
  projectId: "thek9store-f61b2",
  storageBucket: "thek9store-f61b2.appspot.com",
  messagingSenderId: "463271846297",
  appId: "1:463271846297:web:5256354cb2333234717308"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore()