import { AsyncPipe } from '@angular/common';
import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { DecriptionInformationComponent } from '../../components/description-information/decription-information.component';

@Component({
  selector: 'app-information-guide',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    AsyncPipe,
    DecriptionInformationComponent
  ],
  templateUrl: './information-guide.component.html',
  styleUrl: './information-guide.component.scss',
})
export class InformationGuideComponent {
  toClosed = output();
}
