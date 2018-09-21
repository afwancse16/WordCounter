import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  inputstring: string;
  didsubmit = false;
  istextthere = false;

  constructor() { }

  ngOnInit() {
  }

  public submit() {
    if (this.inputstring && this.inputstring.trim().length > 0) {
      this.didsubmit = true;
      this.istextthere = false;
    } else {
      this.istextthere = true;
    }
  }

  public invalidstring() {
    this.didsubmit = false;
    this.istextthere = false;
    this.inputstring = null;
  }

}
