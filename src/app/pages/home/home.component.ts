import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
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
import { RuralPropertyService } from '../../core/services/rural-gis/rural-property.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MesageService } from '../../shared/services/mesage.service';

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
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  CAR = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d{7}-[0-9A-F]{32}$/),
  ]);

  private _ruralPropertyService: RuralPropertyService =
    inject(RuralPropertyService);

  private _mesageService : MesageService = inject(MesageService)

  downloadPDF() {
    const car = this.CAR.value;
    if (this.CAR.valid && car !== null) {
      this._ruralPropertyService.downloadPdf('ES-' + car.toUpperCase());
    } else {
      this._mesageService.openSnackBar('Número de CAR inválido')
    }
  }
}
