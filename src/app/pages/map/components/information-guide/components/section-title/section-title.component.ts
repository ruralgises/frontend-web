import {
  Component,
  input,
} from '@angular/core';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [],
  template: `
    <div>
      <h4>{{ title() }}</h4>
      <p>{{ subTitle() }}</p>
    </div>
  `,
  styles: `
    h4 {
      font-weight: 600;
      margin: 1rem 0px;
      margin-bottom: 0.3rem;
      text-align: center;
    }
    p {
      font-size: 0.9rem;
      color: #696969;
      text-align: center;
      margin: 0;
      margin-bottom: 1rem
    }
  `,
})
export class SectionTitleComponent {
  title = input.required<string>();
  subTitle = input.required<string>();
}
