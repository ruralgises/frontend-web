import { Component } from '@angular/core';

@Component({
  selector: 'app-section-data',
  standalone: true,
  imports: [],
  template: `<p><ng-content /></p>`,
  styles: `
    p {
      margin-bottom: 0.2em;
    }
  `,
})
export class SectionDataComponent {}
