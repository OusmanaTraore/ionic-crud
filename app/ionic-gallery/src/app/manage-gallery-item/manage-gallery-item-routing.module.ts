import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageGalleryItemPage } from './manage-gallery-item.page';

const routes: Routes = [
  {
    path: '',
    component: ManageGalleryItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageGalleryItemPageRoutingModule {}
