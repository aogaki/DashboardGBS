import { NgModule } from '@angular/core';

import { ChartModule } from 'angular2-chartjs';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { EnergyComponent } from './energy/energy.component';
import { EnergySummaryComponent } from './energy/energy-summary/energy-summary.component';
import { EnergyChartComponent } from './energy-chart/energy-chart.component';
import { FluxChartComponent } from './flux-chart/flux-chart.component';
import { PositionComponent } from './position/position.component';

@NgModule({
  imports: [ThemeModule, ChartModule],
  declarations: [
    DashboardComponent,
    EnergyComponent,
    EnergySummaryComponent,
    EnergyChartComponent,
    FluxChartComponent,
    PositionComponent
  ]
})
export class DashboardModule {}
