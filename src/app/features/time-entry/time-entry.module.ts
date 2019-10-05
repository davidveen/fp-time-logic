import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';

import { TimeEntryView } from './views/time-entry.view';
import { SelectorComponent } from './components/selector/selector.component';

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
