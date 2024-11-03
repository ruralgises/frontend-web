import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Map, Tile, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import { defaults as defaultControls } from 'ol/control';
import { environment } from '../../../../../environments/environment';
import { TILDE } from '@angular/cdk/keycodes';

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
    const ES_EXTENT = [
      -41.8793911540082, - 21.2999812200881,
      -39.6641495558494, - 17.8908685478251,
    ];

    this.map = new Map({
      view: new View({ center: [0, 0], zoom: 3, projection: 'EPSG:4674' }),
      layers: [
        new TileLayer({ source: new OSM() }),
        new TileLayer({
          source: new TileWMS({
            url: environment.baseGeoserver,
            params: {
              LAYERS: environment.zoomAte9,
              VERSION: environment.WMSVersion,
              FORMAT: environment.WMSFormat,
              TILDE: true
            },
          }),
          maxZoom: 9,
        }),
        new TileLayer({
          source: new TileWMS({
            url: environment.baseGeoserver,
            params: {
              LAYERS: environment.zoomDe9Ate15,
              VERSION: environment.WMSVersion,
              FORMAT: environment.WMSFormat,
              TILDE: true
            },
          }),
          maxZoom: 15,
          minZoom: 9.01,
        }),
        new TileLayer({
          source: new TileWMS({
            url: environment.baseGeoserver,
            params: {
              LAYERS: environment.zoomAPartir15,
              VERSION: environment.WMSVersion,
              FORMAT: environment.WMSFormat,
              TILDE: true
            },
          }),
          minZoom: 15.01,
        }),
      ],
      target: 'map',
      controls: defaultControls({
        zoom: false,
      }),
    });

    this.map.getView().fit(ES_EXTENT);

    this.map?.getView().on('change:resolution', this.updateZoomDisplay);
  }

  updateZoomDisplay() {
    const zoomLevel = this.map?.getView().getZoom();
    console.log(zoomLevel)
  }
}
