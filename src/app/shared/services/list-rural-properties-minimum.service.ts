import { inject, Injectable, signal } from '@angular/core';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { filter } from 'rxjs/internal/operators/filter';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { RuralPropertyMinimumService } from '../../core/services/rural-property-minimum.service';
import { RuralPropertyMinimum } from '../../core/models/rural-gis-reponse/RuralPropertyMinimum';
import {
  catchError,
  Observable,
  of,
  Subject,
  takeUntil,
} from 'rxjs';
import { GeoSpatialInformation } from '../../core/models/rural-gis-reponse/GeoSpatialInformation';
import { Map, MapBrowserEvent } from 'ol';
import { unByKey } from 'ol/Observable';
import { WaysToConsultRuralProperty } from '../../core/enum/ways-to-consult-rural-property.enum';

@Injectable()
export class ListRuralPropertiesMinimumService {
  private _ruralPropertyMinimumService = inject(RuralPropertyMinimumService);
  private _listRuralProperties =
    new Subject<GeoSpatialInformation<RuralPropertyMinimum> | null>();

  private _consultationStarted = new Subject<WaysToConsultRuralProperty>();

  listRuralProperties$ = this._listRuralProperties.asObservable();
  consultationStarted$ = this._consultationStarted.asObservable();

  listenClickOnTheMap(map: Map, unsubscribe$: Observable<void>) {
    const eventKey = map.on('click', (event: MapBrowserEvent<UIEvent>) => {
      this._consultationStarted.next(WaysToConsultRuralProperty.CLICK_MAP);
      const coord = event.coordinate;
      this._ruralPropertyMinimumService
        .getByCoordinateRuralPropretiesMinimum(coord[0], coord[1])
        .subscribe((x: GeoSpatialInformation<RuralPropertyMinimum> | null) => {
          this._listRuralProperties.next(x);
        });
    });

    unsubscribe$.subscribe(() => {
      unByKey(eventKey);
    });
  }

  listenToSearchChanges(
    search$: Observable<string | null>,
    unsubscribe$: Observable<void>
  ) {
    search$
      .pipe(
        takeUntil(unsubscribe$),
        filter((term): term is string => term != undefined && term != null),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => {
          this._consultationStarted.next(WaysToConsultRuralProperty.CAR);
          if (term?.length < 13) {
            return of(null);
          }
          return this._ruralPropertyMinimumService
            .getByCodeRuralPropretiesMinimum(term)
            .pipe(
              catchError(() => {
                return of<GeoSpatialInformation<RuralPropertyMinimum> | null>(
                  null
                );
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
        },
      });
  }
}

