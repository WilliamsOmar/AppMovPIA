import { Component, inject } from '@angular/core';
import { nota } from '../tabs/tabs.notasmodel';
import { Firestore, doc, docData, getDoc, updateDoc, deleteDoc, DocumentReference } from '@angular/fire/firestore';
import { setDoc  } from 'firebase/firestore';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page{

  nota: nota[] = [];

  newNota: nota;

  firestore: Firestore = inject(Firestore);

  constructor(private DataService: DataService) {
    this.initNota();
  }

  initNota() {
    this.newNota = {
      titulo: '',
      descripcion: '',
      id: this.DataService.createIdDoc(),
    }
  }


  createDocument(data:any, enlace: string){
    const document = doc(this.firestore, enlace);
    return setDoc(document, data);
  }

  async save(){
    console.log(this.newNota)
    await this.DataService.createDocumentID(this.newNota, 'Notas', this.newNota.id)
    this.initNota();
  }

}
