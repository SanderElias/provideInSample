import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

if (Symbol['asyncIterator'] === undefined) {
  (Symbol as any)['asyncIterator'] = Symbol.for('asyncIterator');
}

@Component({
  selector: 'app-obs-async-iter',
  templateUrl: './obs-async-iter.component.html',
  styleUrls: ['./obs-async-iter.component.css']
})
export class ObsAsyncIterComponent implements OnInit, OnDestroy {
  @ViewChild('btn') btnRef: ElementRef;
  destroy$ = new Subject<void>();
  btn: HTMLButtonElement;

  constructor() {}

  async ngOnInit() {
    this.btn = this.btnRef.nativeElement;
    console.log(this.btn);
    const clicks$ = fromEvent(this.btn, 'click').pipe(takeUntil(this.destroy$));
    for await (const event of toAsyncIterator(clicks$)) {
      console.log('click!!', event);
    }
    console.log('elemnt is destroyd');
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}

interface Res {
  value: any;
  done: boolean;
}

async function* toAsyncIterator(ob: Observable<any>) {
  let goResolve, goReject;
  const setPromise = () =>
    new Promise<Res>((resolve, reject) => {
      goResolve = resolve;
      goReject = reject;
    });
  let lastPromise = setPromise();

  ob.subscribe(
    r =>
      goResolve({
        value: r,
        done: false
      }),
    err => goReject(err),
    () => goResolve({ value: undefined, done: true })
  );

  // Still have to decide what to to with the error case
  // for now, it will be forwarded to the consumer.
  // (they need to implement a try/catch)

  while (true) {
    const result: Res = await lastPromise;
    if (result.done) {
      return;
    }
    yield result.value;
    lastPromise = setPromise();
  }
}
