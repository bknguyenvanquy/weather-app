import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { MapService, TOKEN } from '../map.service';
import { position } from 'src/data/rain.data';
import { defaultStyle } from 'src/data/list-styles-precipitation-global.data';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  mapboxGeocoder: MapboxGeocoder;
  map: mapboxgl.Map;
  coordinatesOfMap: any;
  coordinatesOfGlobal: any;
  maker = new mapboxgl.Marker();

  positionNgapLut = [
    [105.838921106974, 21.0319179891946],
    [105.838921106974, 20.9969317646963],
    [105.800512408717, 20.9969317646963],
    [105.800512408717, 21.0319179891946]
  ];

  currentOption: string = 'precipitation_local';
  selectedTime: number = 0;
  currentLayerId: string = 'precipitation_local_0';
  currentStyle = defaultStyle;

  @ViewChild('map') mapElement: ElementRef;

  constructor(private mapService: MapService) { }

  ngOnInit() {
    mapboxgl.accessToken = TOKEN;

    this.mapService.currentOption.subscribe(option => {
      this.generate(option, this.selectedTime);
    });
    this.mapService.selectedTime.subscribe(time => {
      this.generate(this.currentOption, time);
    });
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
        let placeName = data.features[0].place_name.split(', ')
        .filter(item => isNaN(Number(item))).join(', ');
        const popup = new mapboxgl.Popup().setText(placeName)
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(this.map);
      });
  }

  generate(option: string, time: number) {
    if (option === 'precipitation_local') {
      this.generatePrecipitationLocal(time);
    } else if (option === 'flood_local') {
      this.generateFloodLocal(time);
    } else {
      console.log('selected wrong');
      return;
    }
  }

  generatePrecipitationLocal(time) {
    if (this.currentStyle !== defaultStyle) {
      this.currentStyle = defaultStyle;
    }
    if (this.currentOption !== 'precipitation_local' || this.selectedTime !== time) {
      if (this.currentLayerId) {
        this.map.removeLayer(this.currentLayerId);
      }
      this.currentLayerId = `precipitation_local_${time}`;
      this.map.addLayer({
        id: this.currentLayerId,
        type: 'raster',
        source: `precipitation-local-${time}`,
        paint : {
          'raster-opacity': 0.8
        }
      });
      this.map.setCenter([112.78, 13.82]);
      this.map.setZoom(4);
      this.currentOption = 'precipitation_local';
      this.selectedTime = time;
    }
  }

  generateFloodLocal(time) {
    if (this.currentStyle !== defaultStyle) {
      this.currentStyle = defaultStyle;
    }
    if (this.currentLayerId) {
      this.map.removeLayer(this.currentLayerId);
    }
    this.currentLayerId = `flood_local_${time}`;
    this.map.addLayer({
      id: this.currentLayerId,
      type: 'raster',
      source: 'flood-local',
      paint : {
        'raster-opacity': 0.8
      }
    });
    this.map.setCenter([105.82, 21.01]);
    this.map.setZoom(12);
    this.currentOption = 'flood_local';
    this.selectedTime = time;
  }

  createMap(style) {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: style,
      center: [112.78, 13.82],
      zoom: 4
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

    this.map.on('load', () => {
      this.map.addSource('flood-local', {
        type: 'image',
        url: '../../assets/ngap-lut/transparent_ngap.png',
        coordinates: this.positionNgapLut
        });
      for (let i = 0; i < 7; i++) {
        this.map.addSource(`precipitation-local-${i}`, {
          type: 'image',
          url: `../../assets/luong-mua-khu-vuc/transparent_rain_${i}.png`,
          coordinates: position
          });
      }
      this.map.addLayer({
        id: this.currentLayerId,
        type: 'raster',
        source: `precipitation-local-${this.selectedTime}`,
        paint : {
          'raster-opacity': 0.6
        }
      });
    });

    this.map.on('mousemove', (event) => {
      this.coordinatesOfMap = event.point;
      this.coordinatesOfGlobal = event.lngLat;
    });
    this.map.on('click', (event) => {
      this.addPopup(event);
      this.map.flyTo({
        center: [event.lngLat.lng, event.lngLat.lat],
        zoom: 10
      });
    });
  }
}
