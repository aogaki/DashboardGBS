import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NbDateService } from '@nebular/theme';

import { HttpClientService } from '../../services/http-client.service';

@Component({
  selector: 'log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.scss']
})
export class LogFormComponent {
  expForm = this.fb.group({
    expName: ['DIRAC'],
    dateStart: [''],
    dateEnd: [''],
    contactPerson: ['S.Aogaki'],
    mailAddress: ['dr.s.aogaki@ieee.org'],
    comment: ['New SciFi test']
  });

  constructor(
    private fb: FormBuilder,
    private httpClientService: HttpClientService,
    protected dateService: NbDateService<Date>
  ) {}

  onSubmit() {
    console.log(this.expForm.value);

    this.httpClientService
      .postExpLog(this.expForm.value)
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  }
}
