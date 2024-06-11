import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.scss',
})
export class MapViewComponent implements OnInit, AfterViewInit {
  private map?: Map;

  ngOnInit(): void {
    proj4.defs('EPSG:4674', '+proj=longlat +datum=SIRGAS2000 +no_defs');
    register(proj4);
  }
  ngAfterViewInit(): void {
    this.map = new Map({
      view: new View({ center: [0, 0], zoom: 3, projection: 'EPSG:4674' }),
      layers: [
        new TileLayer({ source: new OSM() }),
        new TileLayer({
          source: new TileWMS({
            url: 'https://geoservicos.ibge.gov.br/geoserver/CGMAT/wms',
            params: {
              LAYERS: 'CGMAT:pbqg22_02_Estado_LimUF',
              VERSION: '1.1.1',
              FORMAT: 'image/png',
            },
          }),
        }),
      ],
      target: 'map',
    });
  }
}
