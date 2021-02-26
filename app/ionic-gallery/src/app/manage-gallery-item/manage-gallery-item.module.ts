import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageGalleryItemPageRoutingModule } from './manage-gallery-item-routing.module';

import { ManageGalleryItemPage } from './manage-gallery-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageGalleryItemPageRoutingModule
  ],
  declarations: [ManageGalleryItemPage]
})
export class ManageGalleryItemPageModule {}
