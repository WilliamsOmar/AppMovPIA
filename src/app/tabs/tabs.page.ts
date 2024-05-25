import { Component, inject } from '@angular/core';
import { nota } from './tabs.notasmodel';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { collection } from 'firebase/firestore';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  firestore: Firestore = inject(Firestore);
  notas$: Observable<nota[]> = of([]);

  constructor() {
    const itemCollection = collection(this.firestore, 'Notas');
    this.notas$ = collectionData(itemCollection) as Observable<nota[]>;
  }

}
