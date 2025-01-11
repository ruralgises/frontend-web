import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Feature, ImageTile, Map, Tile, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import { defaults as defaultControls } from 'ol/control';
import { environment } from '../../../../../environments/environment';
import { ListRuralPropertiesMinimumService } from '../../../../shared/services/list-rural-properties-minimum.service';
import { Subject } from 'rxjs';
import { CARSelectedStateService } from '../../../../shared/services/car-selected-state.service';
import { RuralPropertyMinimum } from '../../../../core/models/rural-gis-reponse/RuralPropertyMinimum';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import { MapStateService } from '../../../../shared/services/map-state.service';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.scss',
})
export class MapViewComponent implements OnInit, AfterViewInit, OnDestroy {
  private map?: Map;
  private _unsubscribe$ = new Subject<void>();
  private _unsubscribeClick$ = new Subject<void>();
  private _latestLayerSelected: VectorLayer<Feature> | null = null;

  private _listRuralPropertiesMinimumService = inject(
    ListRuralPropertiesMinimumService
  );
  private _cARSelectedStateService = inject(CARSelectedStateService);
  private _mapState = inject(MapStateService);

  ngOnInit(): void {
    proj4.defs('EPSG:4674', '+proj=longlat +datum=SIRGAS2000 +no_defs');
    register(proj4);
  }

  ngAfterViewInit(): void {
    const ES_EXTENT = [
      -41.8793911540082, -21.2999812200881, -39.6641495558494,
      -17.8908685478251,
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
              TILDE: true,
            },
            // Exemplo para casos futuros
            // tileLoadFunction: (imageTile: any, src) => {
            //   fetch(src, {
            //     headers: {
            //       'ngrok-skip-browser-warning': 'true',
            //     },
            //   })
            //     .then((response) => response.blob())
            //     .then((blob) => {
            //       imageTile.getImage().src = URL.createObjectURL(blob);
            //     });
            // },

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
              TILDE: true,
            }
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
              TILDE: true,
            }
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

    this._mapState.map = this.map;

    this._listRuralPropertiesMinimumService.listenClickOnTheMap(
      this._unsubscribeClick$.asObservable()
    );

    this._mapState.isDrawing.subscribe((value: boolean) => {
      if (!value) {
        this._listRuralPropertiesMinimumService.listenClickOnTheMap(
          this._unsubscribeClick$.asObservable(),
          1
        );
      } else {
        this._unsubscribeClick$.next();
      }
    });

    this._cARSelectedStateService.CAR_minimum$.subscribe(
      (value: RuralPropertyMinimum | null) => {
        if (this._latestLayerSelected) {
          this.map?.removeLayer(this._latestLayerSelected);
          this._latestLayerSelected = null;
        }

        if (value) {
          const geom: GeoJSON.Geometry | undefined = value.geom;
          const format = new GeoJSON();
          const feature = format.readFeature(geom, {
            dataProjection: 'EPSG:4674',
            featureProjection: this.map?.getView().getProjection(),
          });
          feature.setStyle(
            new Style({
              fill: new Fill({
                color: 'rgba(0, 0, 255, 0.4)',
              }),
              stroke: new Stroke({
                color: '#0000ff',
                width: 2,
              }),
            })
          );
          const vectorSource = new VectorSource({
            features: [feature],
          });
          const vectorLayer = new VectorLayer({
            source: vectorSource,
          });
          this.map?.addLayer(vectorLayer);

          const extent = vectorSource.getExtent();
          if (extent) {
            this.map?.getView().fit(extent, {
              padding: [30, 120, 30, 30], // Opcional: Adiciona padding para que não fique colado nas bordas
            });
          }
          this._latestLayerSelected = vectorLayer;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribeClick$.next();
    this._unsubscribe$.complete();
    this._unsubscribeClick$.complete();
  }
}
