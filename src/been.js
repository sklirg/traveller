import { markBeen } from './script';
import { getFirebaseDb } from './firebaseInit'

export async function fetchBeen() {
  const db = getFirebaseDb();
  if (db === null) {
    console.error("Failed to set up database connection! Whelp... That's bad :(")
    return
  }

  const been = [];
  (await db.collection(`been/${window.uid}/documents`).get()).forEach(el => been.push(el.data().ISO_A3))

  markBeen(been)
}

export function addBeen(ISO_A3) {
  const db = getFirebaseDb();
  if (db === null) {
    console.error("Failed to set up database connection! Whelp... That's bad :(")
    return
  }

  db.collection(`been/${window.uid}/documents`).add({
    ISO_A3,
  }).then(console.log).catch(err => console.error("Failed to add been", err))
}
