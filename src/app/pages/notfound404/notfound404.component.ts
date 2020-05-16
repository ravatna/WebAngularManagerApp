import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

var $ = (window as any)["jQuery"];//Import jQuery

@Component({
  selector: 'app-notfound404',
  templateUrl: './notfound404.component.html',
  styleUrls: ['./notfound404.component.scss']
})
export class Notfound404Component implements OnInit {

  AlertText = ''
  constructor(private router: Router) {
    this.AlertText = 'OOPPS! THE PAGE YOU WERE LOOKING FOR, COULDN\'T BE FOUND.';
   }

  ngOnInit(): void {
    setTimeout(() => {
      this.AlertText = 'This Secound Are Redirect to HOME!'
      this.router.navigate(['/home']);
    },5000);
    
  }

}
