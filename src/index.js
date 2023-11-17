import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABAMBb15PX1rkaA-nMuUDJNSPYLlvRtck",
  authDomain: "fir-netninja-fdf18.firebaseapp.com",
  projectId: "fir-netninja-fdf18",
  storageBucket: "fir-netninja-fdf18.appspot.com",
  messagingSenderId: "325256793158",
  appId: "1:325256793158:web:12bdd3aec72ba0e1928e47",
};

// initialize firebase app
initializeApp(firebaseConfig);

// initialize services
const db = getFirestore();

// collection ref
const colRef = collection(db, "books");

const q = query(colRef, orderBy("createdAt"));

//Real Time Collection data [it run every time when there is a change in db and initially also]
// it takes the database's ref/subscription as first argument and second callback
onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

// adding documents
const addBookForm = document.querySelector(".add");
console.log(addBookForm);
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  }).then(() => {
    addBookForm.reset();
  });
});

// deleting documents
const deleteBookForm = document.querySelector(".id");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const docRef = doc(db, "books", deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});
