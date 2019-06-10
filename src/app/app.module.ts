import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Ng5SliderModule } from 'ng5-slider';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { DisplayOptionsComponent } from './display-options/display-options.component';
import { TimeBarComponent } from './time-bar/time-bar.component';
import { ColorRulerComponent } from './color-ruler/color-ruler.component';
import { StandardModeComponent } from './standard-mode/standard-mode.component';
import { PrecipitationGlobalMapComponent } from './map/precipitation-global-map/precipitation-global-map.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    DisplayOptionsComponent,
    TimeBarComponent,
    ColorRulerComponent,
    StandardModeComponent,
    PrecipitationGlobalMapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    Ng5SliderModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
