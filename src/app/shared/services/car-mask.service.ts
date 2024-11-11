import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, Observable, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarMaskService {
  constructor() {}
  valorFormatado$ = new Subject<string>();

  listenToSearchChanges(
    search$: FormControl<string | null>,
    unsubscribe$: Observable<void>
  ) {
    search$.valueChanges
      .pipe(
        takeUntil(unsubscribe$),
        filter((term): term is string => term != undefined && term != null)
      )
      .subscribe((term: string) => {
        term = term.replaceAll('-', '');
        const regex = /^([A-Z]{2})(\d{0,7})([A-Fa-f0-9]{0,32})?$/;

        if (regex.test(term)) {
          term = term.replace(regex, (_, prefix, digits, hex) => {
            return hex ? `${prefix}-${digits}-${hex}` : `${prefix}-${digits}`;
          });
        }

        search$.setValue(term, { emitEvent: false });
        this.valorFormatado$.next(term);
      });
  }
}
