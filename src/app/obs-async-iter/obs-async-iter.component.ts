import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

if (Symbol['asyncIterator'] === undefined) {
  (Symbol as any)['asyncIterator'] = Symbol.for('asyncIterator');
}

@Component({
  selector: 'app-obs-async-iter',
  templateUrl: './obs-async-iter.component.html',
  styleUrls: ['./obs-async-iter.component.css']
})
export class ObsAsyncIterComponent implements OnInit {
  @ViewChild('btn') btnRef: ElementRef;
  btn: HTMLButtonElement;

  constructor() {}

  async ngOnInit() {
    this.btn = this.btnRef.nativeElement;
    console.log(this.btn);
    const clicks$ = fromEvent(this.btn, 'click');
    for await (const event of toAsyncIterator(clicks$)) {
      console.log('click!!', event)
    }
  }
}

interface Res {
  value: any;
  done: boolean;
}

async function* toAsyncIterator(ob: Observable<any>) {
  let goResolve;
  const setPromise = () => new Promise<Res>(resolve => (goResolve = resolve));
  let lastPromise = setPromise();

  ob.subscribe(r =>
    goResolve(
      {
        value: r,
        done: false
      },
      undefined, // TODO: add error/reject handling.
      goResolve({ value: undefined, done: true })
    )
  );

  while (true) {
    const result: Res = await lastPromise;
    if (result.done) {
      return;
    }
    yield result.value;
    lastPromise = setPromise();
  }
}
