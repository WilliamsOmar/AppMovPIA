import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
  },
  {
    path: 'agregarNotas',
    component: Tab2Page,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
