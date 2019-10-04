import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'time-entry--selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {

  @Input() time: moment.Moment;
  @Input() placeholder: string;

  @Output() timeChange = new EventEmitter<moment.Moment>();

  public DATE_FORMAT = 'MMMM D';

  constructor() { }

  ngOnInit() { }

  update(value) {
    console.log(value);
    const [hours, minutes] = value.split(':');
    this.timeChange.emit(
      this.time.startOf('day')
        .add(hours, 'hours')
        .add(minutes, 'minutes')
    );
  }
}
