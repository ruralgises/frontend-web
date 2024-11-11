import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { RuralPropertyMinimum } from '../../core/models/rural-gis-reponse/RuralPropertyMinimum';
import { RuralPropertyService } from '../../core/services/rural-property.service';
import { RuralProperty } from '../../core/models/rural-gis-reponse/RuralProperty';

@Injectable()
export class CARSelectedStateService {
  private _CAR_minimum = new BehaviorSubject<RuralPropertyMinimum | null>(null);
  private _CAR = new BehaviorSubject<RuralProperty | null>(null);
  private _ruralPropertyService = inject(RuralPropertyService);

  private _consultationStarted = new Subject<void>();

  CAR_minimum$ = this._CAR_minimum.asObservable();
  CAR$ = this._CAR.asObservable();
  consultationStarted$ = this._consultationStarted.asObservable();

  constructor() {
    this._CAR_minimum.subscribe((item) => {
      this.updateCAR(item);
    });
  }

  public update(ruralPropertyMinimum: RuralPropertyMinimum | null) {
    this._CAR_minimum.next(ruralPropertyMinimum);
  }

  private updateCAR(ruralPropertyMinimum: RuralPropertyMinimum | null) {
    if (ruralPropertyMinimum) {
      if (this._CAR.getValue()?.code == ruralPropertyMinimum.code) {
        this._CAR.next(this._CAR.getValue());
      } else {
        this._consultationStarted.next();
        this._ruralPropertyService
          .getByCodeRuralPropreties(ruralPropertyMinimum.code)
          .subscribe((item) => {
            this._CAR.next(item);
          });
      }
    } else {
      this._CAR.next(null);
    }
  }
}
