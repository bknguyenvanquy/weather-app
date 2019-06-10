import { Component, OnInit } from '@angular/core';
import { DISPLAY_OPTIONS } from 'src/data/display-options.data';
import { MapService } from '../map.service';

@Component({
  selector: 'app-display-options',
  templateUrl: './display-options.component.html',
  styleUrls: ['./display-options.component.css']
})
export class DisplayOptionsComponent implements OnInit {

  displayOptions = DISPLAY_OPTIONS;

  currentOption = 'precipitation_local';
  isGlobal = false;

  constructor(private mapService: MapService) { }

  ngOnInit() {
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
