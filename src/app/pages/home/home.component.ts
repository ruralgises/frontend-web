import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { RuralPropertyService } from '../../core/services/rural-property.service';
import { MesageService } from '../../shared/services/mesage.service';
import { Subject, takeUntil } from 'rxjs';
import { CarMaskService } from '../../shared/services/car-mask.service';
import { ListRuralPropertiesMinimumService } from '../../shared/services/list-rural-properties-minimum.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    RouterLink,
    MatIconModule,
    MatAutocompleteModule,
    AsyncPipe,
    ReactiveFormsModule,
  ],
  providers: [ListRuralPropertiesMinimumService, CarMaskService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  CARFormControl = new FormControl(environment.uf +'-', [
    Validators.required,
    Validators.pattern(/^[A-Z]{2}-\d{7}-[0-9A-F]{2,32}$/),
  ]);
  private _unsubscribe$ = new Subject<void>();

  private _ruralPropertyService: RuralPropertyService =
    inject(RuralPropertyService);

  private _mesageService: MesageService = inject(MesageService);

  listRuralPropertiesMinimumService: ListRuralPropertiesMinimumService = inject(
    ListRuralPropertiesMinimumService
  );

  carMaskService: CarMaskService = inject(CarMaskService);

  downloadPDF() {
    const car = this.CARFormControl.value;
    if (this.CARFormControl.valid && car !== null) {
      this._ruralPropertyService.downloadPdf(car.toUpperCase());
    } else {
      this._mesageService.openSnackBar('Número do CAR inválido');
    }
  }

  ngOnInit(): void {
    this.carMaskService.listenToSearchChanges(this.CARFormControl, this._unsubscribe$);

    this.listRuralPropertiesMinimumService.listenToSearchChanges(
      this.carMaskService.valorFormatado$,
      this._unsubscribe$
    );
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
