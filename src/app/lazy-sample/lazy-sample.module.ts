import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DemoInterceptor } from './demo.interceptor';

const routes: Routes = [{ path: '', component: ListComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [ListComponent],
  providers:[    ]
})
export class LazySampleModule {}
