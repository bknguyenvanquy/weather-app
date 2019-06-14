import { Component, OnInit } from '@angular/core';
import { DISPLAY_OPTIONS } from 'src/data/display-options.data';
import { MapService } from '../map.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-display-options',
  templateUrl: './display-options.component.html',
  styleUrls: ['./display-options.component.css']
})
export class DisplayOptionsComponent implements OnInit {

  displayOptions = DISPLAY_OPTIONS;

  currentOption = 'precipitation_local';
  isGlobal = false;

  constructor(private mapService: MapService,
              private router: Router) { }

  ngOnInit() {
    this.mapService.router.subscribe(path => {
      if (path === '/global-map') {
        this.isGlobal = true;
        this.currentOption = 'precipitation_global';
      }
    });
  }

  chooseGlobal() {
    this.currentOption = '';
    this.isGlobal = true;
  }

  chooseOption(option: string) {
    this.currentOption = option;
    this.mapService.changeOption(option);
    this.isGlobal = false;
  }

}
