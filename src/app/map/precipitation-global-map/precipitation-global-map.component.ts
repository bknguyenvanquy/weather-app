import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { MapService, TOKEN } from '../../map.service';
import { listStylesPrecipitationGlobal } from 'src/data/list-styles-precipitation-global.data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-precipitation-global-map',
  templateUrl: './precipitation-global-map.component.html',
  styleUrls: ['./precipitation-global-map.component.css']
})
export class PrecipitationGlobalMapComponent implements OnInit, AfterViewInit {
  mapboxGeocoder: MapboxGeocoder;
  map: mapboxgl.Map;
  coordinatesOfMap: any;
  coordinatesOfGlobal: any;
  maker = new mapboxgl.Marker();
  currentStyle = listStylesPrecipitationGlobal[0];

  @ViewChild('global-map') mapElement: ElementRef;
  constructor(private mapService: MapService,
              private router: Router) { }

  ngOnInit() {
    this.mapService.changeRouter(this.router.url);
    mapboxgl.accessToken = TOKEN;
  }

  ngAfterViewInit() {
    this.createMap(this.currentStyle);
  }

  addMarker(e) {
    if (typeof this.maker !== 'undefined') {
      this.maker.remove();
    }
    this.maker.setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(this.map);
  }

  addPopup(e) {
    this.mapService.getLocationByCoordiates(e.lngLat.lng.toString(), e.lngLat.lat.toString())
      .subscribe((data:any) => {
        if (data.features[0]) {
          let placeName = data.features[0].place_name.split(', ')
          .filter(item => isNaN(Number(item))).join(', ');
          const popup = new mapboxgl.Popup().setText(placeName)
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .addTo(this.map);
        }
      });
  }

  generatePrecipitationGlobal(time) {
    if (this.currentStyle !== listStylesPrecipitationGlobal[time]) {
      this.currentStyle = listStylesPrecipitationGlobal[time];
      this.map.setStyle(this.currentStyle);
      this.map.setZoom(10);
    }
  }

  createMap(style) {
    this.map = new mapboxgl.Map({
      container: 'global-map',
      style: style,
      center: [105.804817, 21.028511],
      zoom: 10
    });

    this.map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    }), 'top-left');
    this.map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }));
    this.map.addControl(new mapboxgl.NavigationControl());
    this.mapService.selectedTime.subscribe(time => {
      this.generatePrecipitationGlobal(time);
    });
    this.map.on('mousemove', (event) => {
      this.coordinatesOfMap = event.point;
      this.coordinatesOfGlobal = event.lngLat;
    });
    this.map.on('click', (event) => {
      this.addPopup(event);
      this.map.flyTo({
        center: [event.lngLat.lng, event.lngLat.lat],
        zoom: 12
      });
    });
  }

}
