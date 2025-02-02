import {
  Component,
  inject,
  LOCALE_ID,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { MapViewComponent } from './components/map-view/map-view.component';
import { SideOptionsComponent } from './components/side-options/side-options.component';
import { ListRuralPropertiesMinimumService } from '../../shared/services/list-rural-properties-minimum.service';
import { CARSelectedStateService } from '../../shared/services/car-selected-state.service';
import { InformationGuideComponent } from './components/information-guide/information-guide.component';
import { RuralProperty } from '../../core/models/rural-gis-reponse/RuralProperty';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { MapControlsComponent } from './components/map-controls/map-controls.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AsyncPipe } from '@angular/common';
import { DrawInteractionComponent } from './components/draw-interaction/draw-interaction.component';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    MapViewComponent,
    InformationGuideComponent,
    SideOptionsComponent,
    MapControlsComponent,
    MatProgressBarModule,
    AsyncPipe,
    DrawInteractionComponent,
  ],
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
  showLoading = new BehaviorSubject<boolean>(false);
  showLoading$ = this.showLoading.asObservable();

  private _listRuralPropertiesMinimumService = inject(
    ListRuralPropertiesMinimumService
  );
  private _cARSelectedStateService = inject(CARSelectedStateService);
  CAR: RuralProperty | null = null;
  informationGuideIsOpen = signal(false);

  closeInformationGuide() {
    this.informationGuideIsOpen.set(false);
    this._cARSelectedStateService.update(null);
  }

  ngOnInit(): void {
    this._cARSelectedStateService.consultationStarted$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(() => {
        this.showLoading.next(true);
        if (!this.informationGuideIsOpen()) {
          this.informationGuideIsOpen.set(true);
        }
      });

    this._cARSelectedStateService.CAR$.pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe((item) => {
      if (item) {
        this.showLoading.next(false);
      }
      this.CAR = item;
      this.informationGuideIsOpen.set(!!item);

      if (window.innerWidth <= 600) {
        // Rola a página 100vw (100% da largura da tela) para baixo
        window.scrollBy({
          top: window.innerHeight, // Rola a página para baixo uma vez a altura da tela
          left: 0,
          behavior: 'smooth', // Rolagem suave
        });
      }
    });

    this._listRuralPropertiesMinimumService.consultationStarted$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(() => {
        this.showLoading.next(true);
      });

    this._listRuralPropertiesMinimumService.listRuralProperties$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((item) => {
        this.showLoading.next(false);
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
