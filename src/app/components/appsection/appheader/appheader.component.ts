import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.scss']
})
export class AppheaderComponent implements OnInit {
  IsLogin = false;
  constructor() { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.IsLogin = false;
    }, 1500);
  }

}
