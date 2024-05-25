import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, collectionData, docData } from '@angular/fire/firestore';
import { collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

const { v4: uuidv4 } = require('uuid')

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private firestore: Firestore = inject(Firestore);

  constructor() {  }

  getDocument<tipo>(enlace: string){
    const document = doc(this.firestore, enlace) as DocumentReference<tipo, any>;
    return getDoc<tipo, any >(document)
  }

  getDocumentChanges<tipo>(enlace: 'Notas'){
    const document = doc(this.firestore, enlace);
    return docData(document) as Observable<tipo[]>;
  }

  getCollectionChanges<tipo>(enlace: 'Notas'){
    const itemCollection = collection(this.firestore, enlace);
    return collectionData(itemCollection) as Observable<tipo[]>;
  }

  createDocument(data: any, enlace: 'Notas'){
    const document = doc(this.firestore, enlace);
    return setDoc(document, data);
  }

  createDocumentID(data: any, enlace: 'Notas', idDoc: string){
    const document = doc(this.firestore, `${enlace}/${idDoc}`);
    return setDoc(document, data);
  }

  async updateDocumentID(data: any, enlace: 'Notas', idDoc: string){
    const document = doc(this.firestore, `${enlace}/${idDoc}`);
    return updateDoc(document, data);
  }

  async updateDocument(data: any, enlace: 'Notas'){
    const document = doc(this.firestore, enlace);
    return updateDoc(document, data);
  }

  deleteDocumentID(enlace: 'Notas', idDoc: string){
    const document = doc(this.firestore, `${enlace}/${idDoc}`);
    return deleteDoc(document);
  }

  deleteDocFromRef(ref: any) {
    return deleteDoc(ref)
  }

  createIdDoc(){
    return uuidv4()
  }

}
