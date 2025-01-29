import { inject, Injectable, signal } from '@angular/core';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { filter } from 'rxjs/internal/operators/filter';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { RuralPropertyMinimumService } from '../../core/services/rural-property-minimum.service';
import { RuralPropertyMinimum } from '../../core/models/rural-gis-reponse/RuralPropertyMinimum';
import { catchError, Observable, of, Subject, takeUntil } from 'rxjs';
import { GeoSpatialInformation } from '../../core/models/rural-gis-reponse/GeoSpatialInformation';
import { Map, MapBrowserEvent } from 'ol';
import { unByKey } from 'ol/Observable';
import { WaysToConsultRuralProperty } from '../../core/enum/ways-to-consult-rural-property.enum';
import { Geometry, Point } from 'ol/geom';
import { MapStateService } from './map-state.service';
import { MesageService } from './mesage.service';

@Injectable()
export class ListRuralPropertiesMinimumService {
  private _ruralPropertyMinimumService = inject(RuralPropertyMinimumService);
  private _mapSingletonService = inject(MapStateService);
  private _msgService = inject(MesageService);
  private _listRuralProperties =
    new Subject<GeoSpatialInformation<RuralPropertyMinimum> | null>();

  private _consultationStarted = new Subject<WaysToConsultRuralProperty>();

  listRuralProperties$ = this._listRuralProperties.asObservable();
  consultationStarted$ = this._consultationStarted.asObservable();

  listenClickOnTheMap(unsubscribe$: Observable<void>, skip: number = 0) {
    const eventKey = this._mapSingletonService.map?.on(
      'click',
      (event: MapBrowserEvent<UIEvent>) => {
        if(skip == 0) {
          this._consultationStarted.next(WaysToConsultRuralProperty.CLICK_MAP);
          const coord = event.coordinate;
          const point = new Point(coord);
          this._ruralPropertyMinimumService
            .getByGeometryRuralPropretiesMinimum(point)
            .subscribe({
              next: (x: GeoSpatialInformation<RuralPropertyMinimum> | null) => {
                this._listRuralProperties.next(x);
              },
              error: () => {
                this._listRuralProperties.next(null);
                this._msgService.openSnackBar('Erro ao consultar as propriedades rurais');
              },
            });
        }else{
          skip--;
        }
      }
    );

    if (eventKey) {
      unsubscribe$.subscribe(() => {
        unByKey(eventKey);
      });
    }
  }

  searchDrawPolygon(geometry: Geometry) {
    this._consultationStarted.next(WaysToConsultRuralProperty.DRAW_POLYGON);
    this._ruralPropertyMinimumService
      .getByGeometryRuralPropretiesMinimum(geometry)
      .subscribe({
        next: (x: GeoSpatialInformation<RuralPropertyMinimum> | null) => {
          this._listRuralProperties.next(x);
        },
        error: () => {
          this._listRuralProperties.next(null);
          this._msgService.openSnackBar('Erro ao consultar as propriedades rurais');
        }
      });
  }

  listenToSearchChanges(
    search$: Observable<string | null>,
    unsubscribe$: Observable<void>
  ) {
    search$
      .pipe(
        // takeUntil(unsubscribe$),
        filter((term): term is string => term != undefined && term != null),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((car: string) => {
          this._consultationStarted.next(WaysToConsultRuralProperty.CAR);
          if (car?.length < 13) {
            return of(null);
          }
          return this._ruralPropertyMinimumService
            .getByCodeRuralPropretiesMinimum(car)
            .pipe(
              catchError((error) => {
                this._msgService.openSnackBar(
                  'Erro ao consultar as propriedades rurais'
                );
                return of(null);
              })
            );
        })
      )
      .subscribe({
        next: (result: GeoSpatialInformation<RuralPropertyMinimum> | null) => {
          this._listRuralProperties.next(result);
        },
        error: () => {
          this._listRuralProperties.next(null);
          this._msgService.openSnackBar('Erro ao consultar as propriedades rurais');
        },
      });
  }
}
