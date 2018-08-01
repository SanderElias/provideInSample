import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilmsService } from './films.service';

@Injectable({
  providedIn: 'root',
  deps: [FilmsService]
})
export class DemoInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url === this.fs.url) {
      console.log('Star Wars Rocks! 😜')
    }
    return next.handle(req);
  }

  constructor(private fs: FilmsService) {}
}
