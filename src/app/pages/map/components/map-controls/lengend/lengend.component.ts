import { Component, inject, OnInit, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LegendService } from '../../../../../core/services/legend.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-lengend',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './lengend.component.html',
  styleUrl: './lengend.component.scss',
})
export class LengendComponent implements OnInit {
  toClosed = output();
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
