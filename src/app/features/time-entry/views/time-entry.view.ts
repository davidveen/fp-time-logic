import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import * as moment from 'moment';
import { pipe, iif, tap } from 'src/app/shared/fp-utils';

const resetToSameDay = iif(
  ([endTime, startTime]) => endTime.dayOfYear() !== startTime.dayOfYear(),
  ([endTime, startTime]) => [endTime.clone().dayOfYear(startTime.dayOfYear()), startTime]
);

const addDayIfEndBeforeStart = iif(
  ([endTime, startTime]) => endTime.isSameOrBefore(startTime),
  ([endTime, startTime]) => [endTime.clone().add(1, 'days'), startTime]
);

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
      .add(23, 'hours');
    this.endTime = moment()
      .startOf('day')
      .add(1, 'days')
      .add(4, 'hours')
      .add(30, 'minutes');

    // window['time'] = this.endTime;
  }

  private updateProperty = (property: string) => (value: any) => {
    this[property] = value;
  }

  public setStartTime = (time: moment.Moment) => {
    return pipe(
      tap(this.updateProperty('startTime')),
      _ => this.endTime,
      tap(this.setEndTime),
    )(time);
  }

  public setEndTime = (time: moment.Moment) => {
    return pipe(
      endTime => [endTime, this.startTime],
      resetToSameDay,
      addDayIfEndBeforeStart,
      ([endTime, _]) => endTime,
      tap(this.updateProperty('endTime')),
    )(time);
  }

}
