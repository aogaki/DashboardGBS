import { Component, OnDestroy } from '@angular/core';
import { HttpClientService } from '../../../services/http-client.service';
import { NbThemeService, NbColorHelper } from '@nebular/theme';

interface MessageInfo {
  id: string;
  mean: string;
  fwhm: string;
  imagePath: string;
  time: string;
}

@Component({
  selector: 'ngx-energy-chart',
  templateUrl: './energy-chart.component.html',
  styleUrls: ['./energy-chart.component.scss']
})
export class EnergyChartComponent implements OnDestroy {
  public messageInfoList: MessageInfo[] = [];
  data: any;
  options: any;
  themeSubscription: any;

  GetTime(time: Date): string {
    let h = ('00' + time.getHours()).slice(-2);
    let m = ('00' + time.getMinutes()).slice(-2);

    return h + ':' + m;
  }

  constructor(
    private httpClientService: HttpClientService,
    private theme: NbThemeService
  ) {
    this.httpClientService
      .getEnergy()
      .then(response => {
        this.messageInfoList = response;

        let timeData: any = [];
        let countData: any = [];
        let errBarData: any = [];
        let offset = 120;
        if (this.messageInfoList.length < 120)
          offset = this.messageInfoList.length;
        for (
          let index = this.messageInfoList.length - offset;
          index < this.messageInfoList.length;
          index++
        ) {
          let time = this.GetTime(
            new Date(Number(this.messageInfoList[index]['time']) * 1000)
          );
          timeData.push(time);

          countData.push(this.messageInfoList[index]['mean']);

          let fwhm = Number(this.messageInfoList[index]['fwhm']) / 2;
          let error =
            time + ': { plus:' + fwhm / 2 + ', minus: ' + -fwhm / 2 + '}';
          errBarData.push(error);
        }

        // console.log(errBarData);

        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
          const colors: any = config.variables;
          const chartjs: any = config.variables.chartjs;

          this.data = {
            labels: timeData,
            datasets: [
              {
                data: countData,
                errorBars: errBarData,
                label: 'Photopeak',
                backgroundColor: NbColorHelper.hexToRgbA(colors.danger, 0.3),
                borderColor: colors.danger
              }
            ]
          };

          this.options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              xAxes: [
                {
                  gridLines: {
                    display: true,
                    color: chartjs.axisLineColor
                  },
                  ticks: {
                    fontColor: chartjs.textColor
                  }
                }
              ],
              yAxes: [
                {
                  gridLines: {
                    display: true,
                    color: chartjs.axisLineColor
                  },
                  ticks: {
                    fontColor: chartjs.textColor
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Photopeak [MeV]'
                  }
                }
              ]
            },
            legend: {
              labels: {
                fontColor: chartjs.textColor
              }
            }
          };
        });
      })
      .catch(error => console.log(error));
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
