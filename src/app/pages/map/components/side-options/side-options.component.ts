import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-side-options',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './side-options.component.html',
  styleUrl: './side-options.component.scss',
})
export class SideOptionsComponent {
  CARFormControl = new FormControl('');
}
