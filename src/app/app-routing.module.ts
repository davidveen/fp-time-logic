import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'time',
    loadChildren: () => import('./features/time-entry/time-entry.module')
      .then(m => m.TimeEntryModule)
  },
  {
    path: '',
    redirectTo: 'time',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
