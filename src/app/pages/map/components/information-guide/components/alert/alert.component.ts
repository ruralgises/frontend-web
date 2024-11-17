import { Component, input, OnInit, signal } from '@angular/core';
import Plotly, { Data } from 'plotly.js-dist-min';
import { RuralProperty } from '../../../../../../core/models/rural-gis-reponse/RuralProperty';
import { SectionTitleComponent } from "../section-title/section-title.component";
import { SectionDividerComponent } from "../section-divider/section-divider.component";

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [SectionTitleComponent, SectionDividerComponent],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent implements OnInit {
  ruralProperty = input.required<RuralProperty | null>();
  mesageLarge = signal<boolean>(false);
  showgraphBar = signal<boolean>(false);
  public graphPie: any;
  public graphBar: any;

  ngOnInit(): void {
    console.log(this.ruralProperty()?.alert?.values);
    this.graphPie = {
      data: [
        {
          values: [
            this.ruralProperty()?.alert?.percentageOfThePropertyAreaTotal,
            100 -
              this.ruralProperty()?.alert?.percentageOfThePropertyAreaTotal!,
          ],
          labels: ['Alertas', 'Livre de alertas'],
          type: 'pie',
          marker: { colors: ['orange', 'green'] },
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

    const arrConcated = this.ruralProperty()?.alert?.values.reduce(
      (acc, item) => {
        if (!acc[item.detectYear]) {
          acc[item.detectYear] = 0;
        }

        acc[item.detectYear] += item.areaIntersectHa;

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

    if (years.length >= 10) {
      this.mesageLarge.set(true);
    }

    if (years.length > 0) {
      this.graphBar = {
        data: [
          {
            x: years,
            y: areas,
            type: 'bar',
            mode: 'markers',
            marker: { color: 'orange' },
            width: 0.2,
          },
        ] as Data[],
        layout: {
          width: 360,
          height: 250,
          font: { color: 'white' },
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

  private filterYears(years: string[]) {
    if (years.length > 5) {
      const firstElement = years[0];
      const middleLeftElement = years[Math.floor(years.length / 4)];
      const middleElement = years[Math.floor(years.length / 2)];
      const middleRightElement = years[Math.floor((years.length / 4) * 3)];
      const lastElement = years[years.length - 1];

      return [
        firstElement,
        middleLeftElement,
        middleElement,
        middleRightElement,
        lastElement,
      ];
    }

    return years;
  }

  ngAfterViewInit(): void {
    Plotly.newPlot(
      'grafico-pie-alert',
      this.graphPie.data,
      this.graphPie.layout,
      this.graphPie.config
    );

    Plotly.newPlot(
      'grafico-bar-alert',
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

        Plotly.redraw('grafico-bar-alert');
      });
  }
}
