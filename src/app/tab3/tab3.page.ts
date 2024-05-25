import { Component, inject } from '@angular/core';
import { User } from './user.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/angular/standalone";
import { ExploreContainerComponentModule } from "../explore-container/explore-container.module";

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss'],
    standalone: true,
    imports: [IonContent, IonTitle, IonToolbar, IonHeader, ReactiveFormsModule, FormsModule, ExploreContainerComponentModule]
})
export class Tab3Page {

  firebaseService = inject(AuthService);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])

  })
  constructor() { }

  ngOnInit() {
  }

  async submit() {

    if (this.form.valid) {


      this.firebaseService.signIn(this.form.value as User)
        .then(resp => {

          console.log('___', resp)

        })
    }
  }

}
