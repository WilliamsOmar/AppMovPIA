import { Component, inject } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { nota } from '../tabs/tabs.notasmodel';
import { collection } from 'firebase/firestore';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  firestore: Firestore = inject(Firestore);
  notas$: Observable<nota[]> = of([]);

  constructor() {
    const itemCollection = collection(this.firestore, 'Notas');
    this.notas$ = collectionData(itemCollection) as Observable<nota[]>;
  }

}
