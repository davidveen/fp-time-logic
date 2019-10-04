import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectorComponent } from './selector/selector.component';
import { RouterModule } from '@angular/router';
import { TimeEntryView } from './time-entry.view';
import { SharedModule } from 'src/app/shared/shared.module';

const routes = [
  {
    path: '',
    component: TimeEntryView
  }
];

@NgModule({
  declarations: [
    TimeEntryView,
    SelectorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class TimeEntryModule { }
