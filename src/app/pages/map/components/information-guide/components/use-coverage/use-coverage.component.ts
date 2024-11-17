import { AfterViewInit, Component, input, OnInit } from '@angular/core';
import { RuralProperty } from '../../../../../../core/models/rural-gis-reponse/RuralProperty';
import Plotly, { Data } from 'plotly.js-dist-min';
import { SectionTitleComponent } from '../section-title/section-title.component';
import { SectionDividerComponent } from '../section-divider/section-divider.component';

@Component({
  selector: 'app-use-coverage',
  standalone: true,
  imports: [SectionTitleComponent, SectionDividerComponent],
  templateUrl: './use-coverage.component.html',
  styleUrl: './use-coverage.component.scss',
})
export class UseCoverageComponent implements OnInit, AfterViewInit {
  ruralProperty = input.required<RuralProperty | null>();
  public graphPie: any;

  ngOnInit(): void {
    const arraysGraphPie = this.getArrays();

    if(arraysGraphPie){
      this.graphPie = {
        data: [
          {
            values: arraysGraphPie.values,
            labels: arraysGraphPie.labels,
            type: 'pie',
            marker: { colors: arraysGraphPie.colors },
            textinfo: 'percent',
            textposition: 'auto',
            automargin: true,
          },
        ] as Data[],
        layout: {
          width: 250,
          height: 250,
          showlegend: false,
          plot_bgcolor: 'rgba(0,0,0,0)',
          paper_bgcolor: 'rgba(0,0,0,0)',
          margin: { t: 0, b: 0, l: 0, r: 0 },
        } as Plotly.Layout,
        config: {
          displayModeBar: false,
          staticPlot: false,
        },
      };
    }
  }

  ngAfterViewInit(): void {
    Plotly.newPlot(
      'grafico-pie-use-coverage',
      this.graphPie.data,
      this.graphPie.layout,
      this.graphPie.config
    );
  }

  colors = new Map<number, string>([
    [0, '#d3d3d3'], // Non Observed
    [3, '#006400'], // Forest Formation
    [4, '#8fbc8f'], // Savanna Formation
    [5, '#2e8b57'], // Mangrove
    [9, '#228b22'], // Forest Plantation
    [11, '#66cdaa'], // Wetland
    [13, '#deb887'], // Other Non Forest Natural Formation
    [15, '#32cd32'], // Pasture
    [20, '#bdb76b'], // Sugar Cane
    [21, '#f0e68c'], // Mosaic of Agriculture and Pasture
    [23, '#ffe4b5'], // Beach and Dune
    [24, '#a9a9a9'], // Urban Infrastructure
    [25, '#d2b48c'], // Other Non Vegetated Area
    [29, '#a0522d'], // Rocky Outcrop
    [31, '#4682b4'], // Aquaculture
    [32, '#f5deb3'], // Salt Flat
    [33, '#1e90ff'], // River, Lake and Ocean
    [41, '#f5f5dc'], // Mosaic of Crops
    [46, '#8b4513'], // Coffee
    [48, '#bc8f8f'], // Other Perennial Crops
    [49, '#556b2f'], // Wooded Sandbank Vegetation
    [50, '#9acd32'], // Herbaceous Sandbank Vegetation
  ]);
  private colorDefault = '#d3d3d3';

  getArrays() {
    return this.ruralProperty()?.useCoverage?.values.reduce((acc, item) => {
      const indexClass = acc.labels.indexOf(item.name);

      if(indexClass !== -1){
        acc.values[indexClass] += item.percentageOfThePropertyArea;

        return acc;
      }

      const color = this.colors.get(item.class);

      acc.colors.push(color ?? this.colorDefault);
      acc.values.push(item.percentageOfThePropertyArea);
      acc.labels.push(item.name);

      return acc;
    }, { colors: new Array<string>, values: new Array<number>, labels: new Array<string> });
  }
}
