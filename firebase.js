// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    getDoc,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBzY0ugocvtYx5FoCYDjmbCn1KYooAQE1w",
    authDomain: "fir-crud-js-addb6.firebaseapp.com",
    projectId: "fir-crud-js-addb6",
    storageBucket: "fir-crud-js-addb6.appspot.com",
    messagingSenderId: "230483442866",
    appId: "1:230483442866:web:8807863169de61038fddab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
export const saveTask = (title, description) => {
    addDoc(collection(db, "tasks"), {
        title: title,
        description: description,
    });
};



export const getTask = (id) => getDoc(doc(db, "tasks", id));

export const onGetTasks = (callback) => onSnapshot(collection(db, "tasks"), callback);

export const deleteTask = id => deleteDoc(doc(db, `tasks`, id))


export const updateTask = (id, newFields) => {
    updateDoc(doc(db, 'tasks', id), newFields)

}
export const getTasks = () => getDocs(collection(db, "tasks"))