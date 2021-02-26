import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'manage-gallery-item',
    loadChildren: () => import('./manage-gallery-item/manage-gallery-item.module').then( m => m.ManageGalleryItemPageModule)
  },
  {
    path: 'view-gallery',
    loadChildren: () => import('./view-gallery/view-gallery.module').then( m => m.ViewGalleryPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
