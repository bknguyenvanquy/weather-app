import { Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';
import { from } from 'rxjs';
import { Options } from 'ng5-slider';
import { MapService } from '../map.service';

@Component({
  selector: 'app-time-bar',
  templateUrl: './time-bar.component.html',
  styleUrls: ['./time-bar.component.css']
})
export class TimeBarComponent implements OnInit {
  listDays = [];
  today = DateTime.local();
  isPlay = true;

  classBtnIcon = 'fas fa-play';
  valueInterval;

  value: number = 0;
  options: Options = {
    floor: 0,
    ceil: 6,
    showTicks: true,
    tickStep: 2,
    getLegend: (value: number): string => {

      if (value % 2 === 0) {
        return this.today.plus({days: value / 2}).weekdayLong;
      }
    }
  };

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.createListDays();
  }

  createListDays() {
    this.listDays.push(this.today.weekdayLong);
    for (let i = 1; i < 10; i++ ) {
      this.listDays.push(this.today.plus({days: i}).weekdayLong);
    }
  }

  toggleBtn() {
    this.isPlay = !this.isPlay;
    if (!this.isPlay) {
      this.classBtnIcon = 'fas fa-pause';
      this.valueInterval = setInterval(() => {
      this.value += 1;
      this.clearInterval();
      this.mapService.changeTime(this.value);
      }, 4000);
    } else {
      this.classBtnIcon = 'fas fa-play';
      clearInterval(this.valueInterval);
    }
  }

  clearInterval() {
    if (this.value > 6) {
      this.value = 0;
      clearInterval(this.valueInterval);
      this.classBtnIcon = 'fas fa-play';
    }
  }
}
