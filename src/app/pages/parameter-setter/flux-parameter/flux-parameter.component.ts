import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClientService } from '../../../services/http-client.service';

@Component({
  selector: 'flux-parameter',
  templateUrl: './flux-parameter.component.html',
  styleUrls: ['./flux-parameter.component.scss']
})
export class FluxParameterComponent {
  parForm = this.fb.group({
    polarity: ['Negative'],
    DCOffset: 0.1,
    threshold: 500,
    start: 0,
    end: 30000,
    ch: '1',
    timeInterval: 500
  });

  constructor(
    private fb: FormBuilder,
    private httpClientService: HttpClientService
  ) {}

  onSubmit() {
    // Now all value are stored as string.
    // The text book suggests using string instead of number.
    // But, I feel i am so silly now.
    var fluxPar = {
      polarity: String(this.parForm.value.polarity),
      DCOffset: String(this.parForm.value.DCOffset),
      threshold: String(this.parForm.value.threshold),
      start: String(this.parForm.value.start),
      end: String(this.parForm.value.end),
      ch: String(this.parForm.value.ch),
      timeInterval: String(this.parForm.value.timeInterval)
    };
    console.log(fluxPar);

    this.httpClientService
      .postFluxPar(fluxPar)
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  }
}
