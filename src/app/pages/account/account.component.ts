import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  IsGeneralMember = false;
  Account: any;
  Personal: any;
  constructor(private router: Router) { 
    if(this.getStorageLogin() == null){
      this.router.navigateByUrl('/home')
    }
  }

  ngOnInit(): void {
    this.Account = this.getStorageLogin();
    this.Personal = this.Account.personal;
    console.log(this.Account);
  }

  getStorageLogin(){
    let act = null;
    act = localStorage.getItem('account');
    if(act == null || act == undefined || act == ''){
      return null;
    }
    return JSON.parse(act);
  }

}
