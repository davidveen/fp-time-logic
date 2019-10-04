import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'app-time-entry',
  template: `
  <section>
    <div class="mr-1">
      <time-entry--selector
        [time]="startTime"
        placeholder="start"
        (timeChange)="setStartTime($event)">
      </time-entry--selector>
    </div>
    <div>
      <time-entry--selector
        [time]="endTime"
        placeholder="end"
        (timeChange)="setEndTime($event)">
      </time-entry--selector>
    </div>
  </section>
  `,
  styles: [
    'section { display: flex; align-items: center; justify-content: center; height: 100%; }',
    '.mr-1 { margin-right: 1rem; }'
  ],
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
      .add(8, 'hours');
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
      time.subtract(1, 'days');
    }
    if (time.isSameOrBefore(this.startTime)) {
      time.add(1, 'days');
    }
    this.endTime = time;
  }
}
