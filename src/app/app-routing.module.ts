import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { patch } from 'webdriver-js-extender';
import { AppComponent } from './app.component';
import { ObsAsyncIterComponent } from './obs-async-iter/obs-async-iter.component';

const routes: Routes = [
  {path: '', component: ObsAsyncIterComponent},
  {path: 'films', loadChildren: './lazy-sample/lazy-sample.module#LazySampleModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
