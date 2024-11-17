import { Component, input } from '@angular/core';
import { SectionTitleComponent } from '../section-title/section-title.component';
import { SectionDividerComponent } from '../section-divider/section-divider.component';
import { RuralProperty } from '../../../../../../core/models/rural-gis-reponse/RuralProperty';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [
    SectionTitleComponent,
    SectionDividerComponent
  ],
  templateUrl: './car.component.html',
  styleUrl: './car.component.scss'
})
export class CarComponent {
  ruralProperty = input.required<RuralProperty | null>()

  tipos = new Map<string, string>([
    ['IRU', 'Imóvel Rural'],
    ['AST', 'Assentamentos de Reforma Agrária'],
    ['PCT', 'Território Tradicional de Povos e Comunidades Tradicionais']
  ]);

  status = new Map<string, string>([
    ['AT', 'Ativo'],
    ['PE', 'Pendente'],
    ['SU', 'Suspenso'],
    ['CA', 'Cancelado']
  ]);
}
