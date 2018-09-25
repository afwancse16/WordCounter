import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { CountService } from '../count.service';
import { StoreText, eType } from '../Model';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  textForm: FormGroup;
  didsubmit = false;
  inputstring: string;
  lengthcount = 0;
  isvalidstring = true;
  output: StoreText;

  constructor(private fb: FormBuilder, private countService: CountService) { }

  ngOnInit() {
    this.textForm = this.fb.group({
      inputstr: ['', Validators.required]
    });

    this.textForm.get('inputstr').valueChanges.subscribe((data: string) => {
      this.lengthcount = data ? data.length : 0;
    });
  }

  public submit() {
    if (this.textForm.valid) {
      this.inputstring = this.textForm.get('inputstr').value;
      this.isvalidstring = this.inputstring.trim().length ? true : false;
      if (this.isvalidstring) {
        const arr = this.countService.validateInputandreturnarray(this.inputstring);
        if (arr.length) {
          this.countService.sortedArrayfromObject(arr, 10, eType.Text, this.inputstring);
          this.output = this.countService.outputarray.filter(i => i.Type === eType.Text)[0];
        } else {
          this.isvalidstring = false;
        }
        this.didsubmit = true;
        this.textForm.get('inputstr').disable();
      }
    }
  }

  public resetForm() {
    this.didsubmit = false;
    this.textForm.reset();
    this.textForm.enable();
    this.inputstring = null;
    this.isvalidstring = true;
  }

  public checkVisiblity = () => this.countService.outputarray.findIndex(i => i.Type === eType.Text) === -1 ? true : false;

  public gotopreviousvalue() {
    const data = this.countService.outputarray.filter(i => i.Type === eType.Text)[0];
    this.textForm.get('inputstr').patchValue(data.Inputstring);
    this.output = data;
    this.didsubmit = true;
    this.textForm.get('inputstr').disable();
  }

}
