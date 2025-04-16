import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXwmdHdhc4aQMnXJ8ocW-qUHfjAOCCFwg",
  authDomain: "iagora-af546.firebaseapp.com",
  projectId: "iagora-af546",
  storageBucket: "iagora-af546.firebasestorage.app",
  messagingSenderId: "279330855110",
  appId: "1:279330855110:web:5367d304f04c8b11b29fc7",
  measurementId: "G-VNZF7XZ2P0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);