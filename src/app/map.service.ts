import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export const TOKEN = 'pk.eyJ1IjoicXV5bmd1eWVuIiwiYSI6ImNqdWF2b2VpcTA2aDAzenBpNDRvdmwybDEifQ.YRBmaFB2_6dOkjoMtsMNsA';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private optionSource = new BehaviorSubject<string>('precipitation_local');
  currentOption = this.optionSource.asObservable();

  private timeSource = new BehaviorSubject<number>(0);
  selectedTime = this.timeSource.asObservable();

  private routerSouce = new BehaviorSubject<string>('');
  router = this.routerSouce.asObservable();

  constructor(private httpClient: HttpClient) { }

  getLocationByCoordiates(lon, lat) {
    return this.httpClient.get(`https://api.tiles.mapbox.com/v4/geocode/mapbox.places/${lon},${lat}.json?access_token=${TOKEN}`);
  }

  changeOption(option: string) {
    this.optionSource.next(option);
  }

  changeTime(time: number) {
    this.timeSource.next(time);
  }

  changeRouter(router: string) {
    this.routerSouce.next(router);
  }
}
