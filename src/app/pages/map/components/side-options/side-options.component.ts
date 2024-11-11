import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { ListRuralPropertiesMinimumService } from '../../../../shared/services/list-rural-properties-minimum.service';
import { CARSelectedStateService } from '../../../../shared/services/car-selected-state.service';
import { AsyncPipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { CarMaskService } from '../../../../shared/services/car-mask.service';
import { GeoSpatialInformation } from '../../../../core/models/rural-gis-reponse/GeoSpatialInformation';
import { RuralPropertyMinimum } from '../../../../core/models/rural-gis-reponse/RuralPropertyMinimum';
import { WaysToConsultRuralProperty } from '../../../../core/enum/ways-to-consult-rural-property.enum';

@Component({
  selector: 'app-side-options',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './side-options.component.html',
  styleUrl: './side-options.component.scss',
})
export class SideOptionsComponent implements OnInit, OnDestroy {
  CARFormControl = new FormControl('ES-', [
    Validators.required,
    Validators.pattern(/^[A-Z]{2}-\d{7}-[0-9A-F]{2,32}$/),
  ]);

  private _unsubscribe$ = new Subject<void>();
  listRuralPropertiesMinimumService = inject(ListRuralPropertiesMinimumService);
  cARSelectedStateService = inject(CARSelectedStateService);
  carMaskService: CarMaskService = inject(CarMaskService);

  ngOnInit(): void {
    this.carMaskService.listenToSearchChanges(
      this.CARFormControl,
      this._unsubscribe$
    );

    this.listRuralPropertiesMinimumService.listenToSearchChanges(
      this.carMaskService.valorFormatado$,
      this._unsubscribe$
    );

    this.listRuralPropertiesMinimumService.listRuralProperties$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (information: GeoSpatialInformation<RuralPropertyMinimum> | null) => {
          if (information?.values.length == 1) {
            this.CARFormControl.setValue(information.values[0].code, {
              emitEvent: false,
            });
            this.cARSelectedStateService.update(information.values[0]);
          }
        }
      );

    this.listRuralPropertiesMinimumService.consultationStarted$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((item: WaysToConsultRuralProperty) => {
        this.cARSelectedStateService.update(null);
        if (item == WaysToConsultRuralProperty.CLICK_MAP) {
          this.CARFormControl.setValue('ES-', {
            emitEvent: false,
          });
        }
      });
  }

  selectedItem(event: MatSelectionListChange){
      const selectedItems : RuralPropertyMinimum[] = event.source.selectedOptions.selected.map(
        (option) => option.value
      );
      this.CARFormControl.setValue(selectedItems[0].code, {emitEvent: false});
      this.cARSelectedStateService.update(selectedItems[0]);
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
function item(value: WaysToConsultRuralProperty): void {
  throw new Error('Function not implemented.');
}
