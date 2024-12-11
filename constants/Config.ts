import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import { getAuth } from 'firebase/auth';
// import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDKcRKxVAZtwIzYOSN6fFDP97YBZrNB9rE',
  authDomain: 'songor-app.firebaseapp.com',
  // databaseURL: 'https://songor-app.firebaseio.com',
  projectId: 'songor-app',
  storageBucket: 'songor-app.firebasestorage.app',
  // messagingSenderId: 'sender-id',
  // appId: '220455394156',
  // measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { app, auth, db };
