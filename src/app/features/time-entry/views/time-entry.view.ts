import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'app-time-entry',
  templateUrl: './time-entry.view.html',
  styleUrls: [ './time-entry.view.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeEntryView implements OnInit {

  public startTime: moment.Moment;
  public endTime: moment.Moment;
  public DATE_FORMAT = 'MMMM D';

  constructor() { }

  ngOnInit() {
    this.startTime = moment()
      .startOf('day')
      .add(17, 'hours');
    this.endTime = moment()
      .startOf('day')
      .add(17, 'hours')
      .add(30, 'minutes');
  }

  setStartTime(time: moment.Moment) {
    this.startTime = time;
    this.setEndTime(this.endTime);
  }

  setEndTime(time: moment.Moment) {
    if (time.dayOfYear() > this.startTime.dayOfYear()) {
      time = time.clone().dayOfYear(this.startTime.dayOfYear());
    }
    if (time.isSameOrBefore(this.startTime)) {
      time = time.clone().add(1, 'days');
    }
    this.endTime = time;
  }
}
