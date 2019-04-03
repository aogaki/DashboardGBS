import { Component, OnDestroy } from '@angular/core';
import { HttpClientService } from '../../../services/http-client.service';
import { NbThemeService, NbColorHelper } from '@nebular/theme';

interface MessageInfo {
  id: string;
  count: string;
  hz: string;
  time: string;
}

@Component({
  selector: 'ngx-flux-chart',
  templateUrl: './flux-chart.component.html',
  styleUrls: ['./flux-chart.component.scss']
})
export class FluxChartComponent implements OnDestroy {
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
      .getFlux()
      .then(response => {
        this.messageInfoList = response;

        let timeData: any = [];
        let countData: any = [];
        let offset = 120;
        if (this.messageInfoList.length < 120) offset = 0;
        for (
          let index = this.messageInfoList.length - offset;
          index < this.messageInfoList.length;
          index++
        ) {
          timeData.push(
            this.GetTime(
              new Date(Number(this.messageInfoList[index]['time']) * 1000)
            )
          );
          countData.push(this.messageInfoList[index]['count']);
        }

        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
          const colors: any = config.variables;
          const chartjs: any = config.variables.chartjs;

          this.data = {
            labels: timeData,
            datasets: [
              {
                data: countData,
                label: 'Number of hit',
                backgroundColor: NbColorHelper.hexToRgbA(colors.primary, 0.3),
                borderColor: colors.primary
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
