import { AfterViewInit, Component, input, OnInit, signal } from '@angular/core';
import { SectionDividerComponent } from '../section-divider/section-divider.component';
import { SectionTitleComponent } from '../section-title/section-title.component';
import Plotly, { Data } from 'plotly.js-dist-min';
import { RuralProperty } from '../../../../../../core/models/rural-gis-reponse/RuralProperty';

@Component({
  selector: 'app-deforestation',
  standalone: true,
  imports: [SectionDividerComponent, SectionTitleComponent],
  templateUrl: './deforestation.component.html',
  styleUrl: './deforestation.component.scss',
})
export class DeforestationComponent implements OnInit, AfterViewInit {
  ruralProperty = input.required<RuralProperty | null>();
  mesageLarge = signal<boolean>(false);
  showgraphBar = signal<boolean>(false);
  public graphPie: any;
  public graphBar: any;

  ngOnInit(): void {
    this.graphPie = {
      data: [
        {
          values: [
            this.ruralProperty()?.deforestations
              ?.percentageOfThePropertyAreaTotal,
            100 -
              this.ruralProperty()?.deforestations
                ?.percentageOfThePropertyAreaTotal!,
          ],
          labels: ['Desmatameto', 'Livre de Desmatamento'],
          type: 'pie',
          marker: { colors: ['red', 'green'] },
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

    const arrConcated = this.ruralProperty()?.deforestations?.values.reduce(
      (acc, item) => {
        if (!acc[item.year]) {
          acc[item.year] = 0;
        }

        acc[item.year] += item.areaIntersectHa;

        return acc;
      },
      new Array<number>()
    );

    const years = new Array<string>();
    const areas = new Array<number>();

    arrConcated?.forEach((value, index) => {
      years.push(index.toString());
      areas.push(value);
    });

    if(years.length >= 10){
      this.mesageLarge.set(true);
    }

    if(years.length > 0){
      this.graphBar = {
        data: [
          {
            x: years,
            y: areas,
            type: 'bar',
            mode: 'markers',
            marker: { color: 'red' },
            width: 0.2,
          },
        ] as Data[],
        layout: {
          width: 360,
          height: 250,
          font: { color: window.matchMedia('(prefers-color-scheme: light)').matches ? 'black' : 'white'},
          plot_bgcolor: 'rgba(0,0,0,0)',
          paper_bgcolor: 'rgba(0,0,0,0)',
          margin: { t: 0, b: 18, l: 20, r: 0 },
          xaxis: {
            tickmode: 'array', // Força ticks lineares
            tickvals: this.filterYears(years), // Define os anos que serão exibidos
          },
        } as Plotly.Layout,
        config: {
          displayModeBar: false,
          staticPlot: false,
        },
      };
      this.showgraphBar.set(true);
    }
  }

  private filterYears(years: string[]){
    if(years.length > 4){
      const firstElement = years[0];
      const middleLeftElement = years[Math.floor(years.length / 4)];
      const middleElement = years[Math.floor(years.length / 2)];
      const middleRightElement = years[Math.floor((years.length / 4) * 3)];
      const lastElement = years[years.length - 1];


      return [firstElement, middleElement,  lastElement];
    }

    return years;
  }

  ngAfterViewInit(): void {
    Plotly.newPlot(
      'grafico-pie-deforestation',
      this.graphPie.data,
      this.graphPie.layout,
      this.graphPie.config
    );

    Plotly.newPlot(
      'grafico-bar-deforestation',
      this.graphBar.data,
      this.graphBar.layout,
      this.graphBar.config
    );

    window
      .matchMedia('(prefers-color-scheme: light)')
      .addEventListener('change', (event) => {
        if (event.matches) {
          this.graphBar.layout.font.color = 'black';
        } else {
          this.graphBar.layout.font.color = 'white';
        }

        Plotly.redraw('grafico-bar-deforestation');
      });
  }
}
