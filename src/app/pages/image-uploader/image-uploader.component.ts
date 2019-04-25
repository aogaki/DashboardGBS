import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClientService } from '../../services/http-client.service';

@Component({
  selector: 'image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {
  formGroup = this.fb.group({
    img2D: [null, Validators.required],
    comment2D: [''],
    imgH: [null, Validators.required],
    commentH: [''],
    imgV: [null, Validators.required],
    commentV: [''],
    commentAll: ['']
  });

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private httpClientService: HttpClientService
  ) {}

  ngOnInit() {}

  onFileChange(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        console.log(event.target.id);
        if (event.target.id === 'img2D') {
          this.formGroup.patchValue({
            img2D: reader.result
          });
        } else if (event.target.id === 'imgH') {
          this.formGroup.patchValue({
            imgH: reader.result
          });
        } else if (event.target.id === 'imgV') {
          this.formGroup.patchValue({
            imgV: reader.result
          });
        }

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  onSubmit() {
    this.httpClientService
      .postPosition(this.formGroup.value)
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  }
}
