import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';

@Component({
  selector: 'app-color-ruler',
  templateUrl: './color-ruler.component.html',
  styleUrls: ['./color-ruler.component.css']
})
export class ColorRulerComponent implements OnInit {
  isGlobalRain = false;
  isLocalRain = true;
  isLocalFlood = false;
  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.mapService.router.subscribe(router => {
      this.mapService.currentOption.subscribe(option => {
        if (router === '/') {
          if (option === 'precipitation_local') {
            this.isGlobalRain = false;
            this.isLocalRain = true;
            this.isLocalFlood = false;
          } else if (option === 'flood_local') {
            this.isGlobalRain = false;
            this.isLocalRain = false;
            this.isLocalFlood = true;
          }
        } else if (router === '/global-map') {
          this.isGlobalRain = true;
          this.isLocalRain = false;
          this.isLocalFlood = false;
        }
      });
    });
  }

}
