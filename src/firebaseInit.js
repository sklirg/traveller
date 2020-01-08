import * as firebase from 'firebase/app';
// Required for side-effects
import "firebase/firestore";

let db = null;

function initializeFirebaseFirestore() {
  // Dont init if we already have init-ed
  if (firebase.apps.length) {
    return;
  }

  firebase.initializeApp({
    apiKey: process.env.firebase_api_key,
    authDomain: process.env.firebase_auth_domain,
    projectId: process.env.firebase_project_id,
  });

  db = firebase.firestore();
}

initializeFirebaseFirestore();

export function getFirebaseDb() {
  return db;
}
