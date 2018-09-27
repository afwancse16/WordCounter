import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { HttpErrorResponse } from '../../../node_modules/@angular/common/http';
import { CountService } from '../count.service';
import { StoreText, eType } from '../Model';

@Component({
  selector: 'app-text-url',
  templateUrl: './text-url.component.html',
  styleUrls: ['./text-url.component.scss']
})
export class TextUrlComponent implements OnInit {

  textUrlForm: FormGroup;
  // boolean for checking whther the user has clicked on submit or not
  didsubmit = false;
  // the url entered by user
  inputUrl: string;
  // check whether the input is valid or not
  isvalidstring = true;
  // error response sent by api
  responseError = null;
  // for app-count component
  output: StoreText;

  constructor(private fb: FormBuilder, private countService: CountService) { }

  ngOnInit() {
    // initializing the form
    this.textUrlForm = this.fb.group({
      inputstr: ['', Validators.required]
    });
  }

  public submit() {
    this.responseError = null;
    if (this.textUrlForm.valid) {
      this.inputUrl = this.textUrlForm.get('inputstr').value;
      this.isvalidstring = this.inputUrl.trim().length ? true : false;
      if (this.isvalidstring) {
        this.countService.getTextFromUrl(this.inputUrl).subscribe(data => {
          this.nextStep(data);
        },
          (err: HttpErrorResponse) => {
            if (err.status.toString().indexOf('4') !== -1) {
              this.responseError = 'Please check the url';
            } else if (err.status.toString().indexOf('5') !== -1) {
              this.responseError = 'Server Error';
            } else {
              this.responseError = 'Something went wrong. Please try again.';
            }
          });
      }
    }
  }

  private nextStep(data: string) {
    const arr = this.countService.validateInputandreturnarray(data.replace(/(<([^>]+)>)/ig, ''));
    if (arr.length) {
      this.countService.sortedArrayfromObject(arr, 10, eType.Url, data, this.inputUrl);
      this.output = this.countService.getOutputArray(eType.Url)[0];
    } else {
      this.isvalidstring = false;
    }
    this.didsubmit = true;
    this.textUrlForm.get('inputstr').disable();
  }

  public resetForm() {
    this.didsubmit = false;
    this.textUrlForm.reset();
    this.textUrlForm.enable();
    this.inputUrl = null;
    this.isvalidstring = true;
    this.responseError = null;
  }

  public checkVisiblity = () => this.countService.getOutputArray(eType.Url).length < 1 ? true : false;

  public gotopreviousvalue() {
    const data = this.countService.getOutputArray(eType.Url)[0];
    this.textUrlForm.get('inputstr').patchValue(data.Url);
    this.output = data;
    this.didsubmit = true;
    this.textUrlForm.get('inputstr').disable();
  }
}
