import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../films.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  films$ = this.fs.Films$;

  constructor(private fs:FilmsService) { }

  ngOnInit() {
  }

}
