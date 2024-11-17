import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CarComponent } from './components/car/car.component';
import { LocationComponent } from './components/location/location.component';
import { ConservationUnitComponent } from './components/conservation-unit/conservation-unit.component';
import { IndigenousLandsComponent } from './components/indigenous-lands/indigenous-lands.component';
import { SettlementComponent } from './components/settlement/settlement.component';
import { DeforestationComponent } from './components/deforestation/deforestation.component';
import { EmbargoComponent } from './components/embargo/embargo.component';
import { RuralProperty } from '../../../../core/models/rural-gis-reponse/RuralProperty';
import { BehaviorSubject, single, skip, Subject, takeUntil } from 'rxjs';
import { CARSelectedStateService } from '../../../../shared/services/car-selected-state.service';
import { ListRuralPropertiesMinimumService } from '../../../../shared/services/list-rural-properties-minimum.service';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UseCoverageComponent } from "./components/use-coverage/use-coverage.component";
import { AlertComponent } from "./components/alert/alert.component";
import { RuralPropertyService } from '../../../../core/services/rural-property.service';

@Component({
  selector: 'app-information-guide',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    CarComponent,
    LocationComponent,
    ConservationUnitComponent,
    IndigenousLandsComponent,
    SettlementComponent,
    DeforestationComponent,
    EmbargoComponent,
    AsyncPipe,
    UseCoverageComponent,
    AlertComponent,
  ],
  templateUrl: './information-guide.component.html',
  styleUrl: './information-guide.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class InformationGuideComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();
  private _isLoading = new BehaviorSubject<boolean>(true);
  private _listRuralPropertiesMinimumService = inject(
    ListRuralPropertiesMinimumService
  );
  private _cARSelectedStateService = inject(CARSelectedStateService);
  private _ruralPropertyService = inject(RuralPropertyService);

  toClosed = output();
  ruralProperty: RuralProperty | null = null;
  isLoading$ = this._isLoading.asObservable();

  ngOnInit(): void {
    this.isLoading$.subscribe((item) => {
      console.log(item);
    });
    this._cARSelectedStateService.consultationStarted$
      .pipe(takeUntil(this._unsubscribe$), skip(1))
      .subscribe(() => {
        this._isLoading.next(true);
      });

    this._cARSelectedStateService.CAR$.pipe(
      takeUntil(this._unsubscribe$),
      skip(1)
    ).subscribe((item) => {
      this.ruralProperty = item;
      if (item) {
        this._isLoading.next(false);
      }
    });
  }

  downloadPdf() {
    if(this.ruralProperty?.code){
      this._ruralPropertyService.downloadPdf(this.ruralProperty?.code);
    }
  }


  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
