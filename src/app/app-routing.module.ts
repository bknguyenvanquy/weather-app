import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { PrecipitationGlobalMapComponent } from './map/precipitation-global-map/precipitation-global-map.component';

const appRoutes: Routes = [
  {path: '', component: MapComponent},
  {path: 'global-map', component: PrecipitationGlobalMapComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
