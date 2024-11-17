import { Component, inject, LOCALE_ID, OnDestroy, OnInit, signal } from '@angular/core';
import { MapViewComponent } from './components/map-view/map-view.component';
import { SideOptionsComponent } from './components/side-options/side-options.component';
import { ListRuralPropertiesMinimumService } from '../../shared/services/list-rural-properties-minimum.service';
import { CARSelectedStateService } from '../../shared/services/car-selected-state.service';
import { InformationGuideComponent } from './components/information-guide/information-guide.component';
import { RuralProperty } from '../../core/models/rural-gis-reponse/RuralProperty';
import { Subject, takeUntil } from 'rxjs';
import { MapControlsComponent } from "./components/map-controls/map-controls.component";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [MapViewComponent, InformationGuideComponent, SideOptionsComponent, MapControlsComponent],
  providers: [
    ListRuralPropertiesMinimumService,
    CARSelectedStateService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();
  private _listRuralPropertiesMinimumService = inject(
    ListRuralPropertiesMinimumService
  );
  private _cARSelectedStateService = inject(CARSelectedStateService);
  CAR: RuralProperty | null = null;
  sideOptionsIsOpen = signal(false);

  ngOnInit(): void {
    this._cARSelectedStateService.consultationStarted$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(() => {
        if (!this.sideOptionsIsOpen()) {
          this.sideOptionsIsOpen.set(true);
        }
      });

    this._cARSelectedStateService.CAR$.pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe((item) => {
      this.CAR = item;
      this.sideOptionsIsOpen.set(!!item);
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
