import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MesageService {
  private _snackBar = inject(MatSnackBar);

  private durationInSeconds = 5;

  openSnackBar(mesage: string) {
    this._snackBar.open(mesage, 'X', {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top',
    });
  }
}
