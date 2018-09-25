import { Component, OnInit, Input } from '@angular/core';
import { StoreText } from '../Model';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.scss']
})
export class CountComponent implements OnInit {

  @Input() isfromurl = false;

  @Input() output: StoreText;

  constructor() { }

  ngOnInit() {
  }

}
