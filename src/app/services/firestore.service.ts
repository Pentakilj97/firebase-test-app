import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { Manga } from '../model/manga';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  db: Firestore

  constructor(private firebaseServ: FirebaseService) {
    this.db = getFirestore(this.firebaseServ.app)
   }

  getManga(id: string): Promise<Manga | null> {
    const docRef = doc(this.db, "manga", id);
  return  getDoc(docRef).then(document => {
      if(document.exists()) {
      return {id: document.id, ...document.data()} as Manga;
      } else {
        return null;
      }
    })
  }

  getMangas(): Promise<Manga[]> {
  const collectionRef = collection(this.db, "manga")
  return getDocs(collectionRef).then(coll => {
   return coll.docs.map(doc => ({id: doc.id, ...doc.data() as Manga}))
  })
  }

}
