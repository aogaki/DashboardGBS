import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClientService } from '../../../services/http-client.service';

interface par {
  polarity: String;
  DCOffset: String;
  threshold: String;
  timeInterval: String;
  inCh: String;
  outCh1: String;
  outCh2: String;
  beamCh: String;
  shortGate: String;
  longGate: String;
}

@Component({
  selector: 'polarimeter-parameter',
  templateUrl: './polarimeter-parameter.component.html',
  styleUrls: ['./polarimeter-parameter.component.scss']
})
export class PolarimeterParameterComponent implements OnInit {
  parForm = this.fb.group({
    polarity: ['Negative'],
    DCOffset: 0.1,
    threshold: 500,
    timeInterval: 500,
    inCh: 0,
    outCh1: 1,
    outCh2: 2,
    beamCh: 3,
    shortGate: 30,
    longGate: 300
  });

  channels: Number[] = [0, 1, 2, 3, 4, 5, 6, 7];

  constructor(
    private fb: FormBuilder,
    private httpClientService: HttpClientService,
    private cdRef: ChangeDetectorRef
  ) {
    let parList: par[] = [];
    this.httpClientService
      .getPolMeterPar()
      .then(response => {
        parList = response;
        this.parForm.value.inCh = Number(parList[0]['inCh']);
      })
      .catch(error => console.log(error));
  }

  ngOnInit() {}

  onSubmit() {
    const polMeterPar: par = {
      polarity: String(this.parForm.value.polarity),
      DCOffset: String(this.parForm.value.DCOffset),
      threshold: String(this.parForm.value.threshold),
      timeInterval: String(this.parForm.value.timeInterval),
      inCh: String(this.parForm.value.inCh),
      outCh1: String(this.parForm.value.outCh1),
      outCh2: String(this.parForm.value.outCh2),
      beamCh: String(this.parForm.value.beamCh),
      shortGate: String(this.parForm.value.shortGate),
      longGate: String(this.parForm.value.longGate)
    };

    this.httpClientService
      .postPolMeterPar(polMeterPar)
      .catch(error => console.log(error));
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.cdRef.detectChanges();
  }
}
