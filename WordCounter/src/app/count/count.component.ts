import { Component, OnInit, Input } from '@angular/core';
import { Functions } from '../functions';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.scss']
})
export class CountComponent implements OnInit {
  public isvalid = false;
  private _inputstr: string;

  get inputstr(): string {
    return this._inputstr;
  }

  @Input()
  set inputstr(inputstr: string) {
    this._inputstr = inputstr;
    this.changedString();
  }

  outputarray = [];

  constructor() { }

  ngOnInit() {
  }

  private changedString() {
    // checking whether the input string is undefined or not.
    if (this.inputstr) {
      /*
          Below I am first replacing all the new line character from string and then all the special character.
          After that I am trimming the extra space.
      */
      const str = this.inputstr.replace(/\n/g, ' ').replace(/[^\w\s]/gi, '').trim();
      let arr = [];
      if (str.length) {
        this.isvalid = true;
        // convert the input string to array.
        arr = str.split(' ');
        // return the object where name is the text and value is its count
        const object = Functions.arraytoObject(arr);
        this.outputarray = Functions.sortedArrayfromObject(object, 10);
      } else {
        this.isvalid = false;
      }
    }
  }

}
