import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoInterceptor } from './lazy-sample/demo.interceptor';
import { ObsAsyncIterComponent } from './obs-async-iter/obs-async-iter.component';

@NgModule({
  declarations: [AppComponent, ObsAsyncIterComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DemoInterceptor,
      multi: true
    }
  ]
})
export class AppModule {}
