import { TimeEntryView } from './time-entry.view';
import { TestBed, ComponentFixture } from '@angular/core/testing';

import { MockComponent, MockModule } from 'ng-mocks';
import * as moment from 'moment';

import { SharedModule } from 'src/app/shared/shared.module';
import { SelectorComponent } from '../components/selector/selector.component';

describe('Time entry', () => {
  let fixture: ComponentFixture<TimeEntryView>;
  let initialStartTime: moment.Moment;
  let initialEndTime: moment.Moment;
  let newStartTime: moment.Moment;
  let newEndTime: moment.Moment;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TimeEntryView,
        MockComponent(SelectorComponent)
      ],
      imports: [
        MockModule(SharedModule)
      ]
    });
    fixture = TestBed.createComponent(TimeEntryView);
  });

  it('should create view', () => {
    expect(fixture).toBeTruthy();
  });

  describe('on simple changes', () => {
    beforeEach(() => {
      newStartTime = moment().startOf('day').add(9, 'hours');
      newEndTime = moment().startOf('day').add(16, 'hours');
      fixture.componentInstance.startTime = moment().startOf('day').add(8, 'hours');
      fixture.componentInstance.endTime = moment().startOf('day').add(17, 'hours');
    });

    it('should change start time', () => {
      fixture.componentInstance.setStartTime(newStartTime);
      expect(fixture.componentInstance.startTime).toEqual(newStartTime);
    });

    it('should change end time', () => {
      fixture.componentInstance.setEndTime(newEndTime);
      expect(fixture.componentInstance.endTime).toEqual(newEndTime);
    });
  });

  describe('on changing end time', () => {
    beforeEach(() => {
      initialStartTime = moment().startOf('day').add(9, 'hours');
      initialEndTime = moment().startOf('day').add(17, 'hours');
      fixture.componentInstance.startTime = initialStartTime;
      fixture.componentInstance.endTime = initialEndTime;
    });

    it('should change end date if end time is set equal to start time', () => {
      newEndTime = initialStartTime.clone();
      fixture.componentInstance.setEndTime(newEndTime);
      expect(fixture.componentInstance.endTime.isAfter(initialStartTime)).toBe(true);
    });

    it('should change end date if end time is set before start time', () => {
      newEndTime = moment().startOf('day');
      fixture.componentInstance.setEndTime(newEndTime);
      expect(fixture.componentInstance.endTime.isAfter(initialStartTime)).toBe(true);
    });

  });

  describe('on changing start time', () => {
    beforeEach(() => {
      initialStartTime = moment().startOf('day').add(23, 'hours');
      initialEndTime = moment().startOf('day').add(1, 'days').add(4, 'hours');
      fixture.componentInstance.startTime = initialStartTime;
      fixture.componentInstance.endTime = initialEndTime;
    });

    it('should change end date if start time is set before end time', () => {
      newStartTime = moment().startOf('day');
      fixture.componentInstance.setStartTime(newStartTime);
      expect(fixture.componentInstance.endTime.dayOfYear()).toEqual(newStartTime.dayOfYear());
    });

    it('should not change end date if start time is set later than end time', () => {
      newStartTime = moment().startOf('day').add(9, 'hours');
      fixture.componentInstance.setStartTime(newStartTime);
      expect(fixture.componentInstance.endTime.dayOfYear()).toBeGreaterThan(newStartTime.dayOfYear());
    });
  });
});
