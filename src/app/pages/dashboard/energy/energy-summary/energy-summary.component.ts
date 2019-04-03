import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-energy-summary',
  templateUrl: './energy-summary.component.html',
  styleUrls: ['./energy-summary.component.scss']
})
export class EnergySummaryComponent {
  @Input() summary: { title: string; value: string }[];
}
