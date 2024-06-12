import { NgIf } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import Plotly, { Data } from 'plotly.js-dist-min';

@Component({
  selector: 'app-decription-information',
  standalone: true,
  imports: [MatDividerModule, NgIf, MatExpansionModule],
  templateUrl: './decription-information.component.html',
  styleUrl: './decription-information.component.scss',
})
export class DecriptionInformationComponent implements OnInit, AfterViewInit {
  public graphPie = {
    data: [
      {
        values: [10, 90],
        labels: ['Desmatameto', 'Livre de Desmatamento'],
        type: 'pie',
        marker: { colors: ['red', 'green'] },
        textinfo: 'percent',
        textposition: 'inside',
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
  };

  public graphBar = {
    data: [
      {
        x: ['2016', '2017', '2018', '2019', '2020'],
        y: [10, 20, 30, 40, 50],
        type: 'bar',
        marker: { color: 'red' },
      },
    ] as Data[],
    layout: {
      width: 400,
      height: 250,
      font: { color: 'white' },
      plot_bgcolor: 'rgba(0,0,0,0)',
      paper_bgcolor: 'rgba(0,0,0,0)',
      margin: { t: 0, b: 15, l: 15, r: 0 },
    } as Plotly.Layout,
  };

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    Plotly.newPlot('grafico-pie', this.graphPie.data, this.graphPie.layout);
    Plotly.newPlot('grafico-bar', this.graphBar.data, this.graphBar.layout);

    window
      .matchMedia('(prefers-color-scheme: light)')
      .addEventListener('change', (event) => {
        if (event.matches) {
          this.graphBar.layout.font.color = 'black'
        }else{
          this.graphBar.layout.font.color = 'white';
        }

        Plotly.redraw('grafico-bar')
      });
  }
}