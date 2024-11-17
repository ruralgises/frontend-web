import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LegendService } from '../../../../../core/services/legend.service';
@Component({
  selector: 'app-lengend',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './lengend.component.html',
  styleUrl: './lengend.component.scss',
})
export class LengendComponent implements OnInit {
  private _legendService = inject(LegendService);
  legend: string = '';

  ngOnInit(): void {
    this.loadLegend();
  }

  loadLegend() {
    this._legendService.legend$.subscribe((legend) => {
      this.legend = legend ?? '';
    });
  }
}
