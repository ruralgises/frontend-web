import { Component } from '@angular/core';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [],
  template: `<h4><ng-content /></h4>`,
  styles: `
    h4 {
      font-weight: 600;
      margin: 1rem 0px;
      text-align: center;
    }
  `,
})
export class SectionTitleComponent {}
