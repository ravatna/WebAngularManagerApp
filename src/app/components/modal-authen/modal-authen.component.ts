import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestfullService } from 'src/app/services/restfull.service';

var $ = (window as unknown as any)["jQuery"];//Import jQuery

@Component({
  selector: 'app-modal-authen',
  templateUrl: './modal-authen.component.html',
  styleUrls: ['./modal-authen.component.scss']
})
export class ModalAuthenComponent implements OnInit {

  IsGeneralMember = true;
  FormName = '';
  FormLogin = {
    username: "",
    password: "",
    tel: ""
  }

  FormRegister = {
    username: "",
    email: "",
    tel: "",
    password: ""
  }

  FormRegisterSpecial = {
    isChecked: false,
    username: "",
    email: "",
    tel: "",
    password: "",
    confirm_password: "",
    firstName: "",
    lastName: "",
    idcard: "",
    whatApp: "",
    line: ""
  }

  constructor(private router: Router,
              private restful: RestfullService
    ) {
    this.IsGeneralMember = true;
    
  }

  ngOnInit(): void {
    this.setFormRegister(this.IsGeneralMember);
  }

  valueLOginChange(value){
  }

  valueRegisterMemberChange(value){
  }

  valueRegisterMemberSpecialChange(value){
  }

  async onSendLOgin(){
    console.log("onSendLOgin()=>", this.FormLogin);
    if(this.FormLogin.username == '' || this.FormLogin.password == ''){

    }
    let post = {
      username: this.FormLogin.username,
      password: this.FormLogin.password
    };
    let login = await this.restful.postHTTP('/login',post);
    login.subscribe((data: any) => {
      localStorage.setItem('account', JSON.stringify(data.data[0]));
      $('.modal').removeClass('show');
      $('.modal-backdrop').remove();
      this.setAll(this.FormLogin, "");
      this.router.navigateByUrl('/account');
      console.log("Login()=>", data );
    },(error)=>{
      console.error("Login()=>", login );
    })
    
  }

  async onSendRegisterSpecial(){
    if(this.FormRegisterSpecial.username == '' || this.FormRegisterSpecial.email == '' || this.FormRegisterSpecial.tel == '' || this.FormRegisterSpecial.password == ''){
      alert("Input From Invald!");
      return;
    }
    
    if(this.FormRegisterSpecial.password != this.FormRegisterSpecial.confirm_password){
      alert("Please Exter Password again!");
      return;
    }

    if(this.FormRegisterSpecial.isChecked == false){
      alert("Please check befor register.");
      return;
    }

    let post = {
      "email":    this.FormRegisterSpecial.email,
      "phone":    this.FormRegisterSpecial.tel,
      "username": this.FormRegisterSpecial.username,
      "password": this.FormRegisterSpecial.password,
      "confirm_password": this.FormRegisterSpecial.confirm_password,
      "firstName": this.FormRegisterSpecial.firstName,
      "lastName": this.FormRegisterSpecial.lastName,
      "idcard": this.FormRegisterSpecial.idcard,
      "whatApp": this.FormRegisterSpecial.whatApp,
      "line1": this.FormRegisterSpecial.line
    };

    let regis = await this.restful.postHTTP('/register',post);
    regis.subscribe((data: any) => {
      if(data.type == "OK"){
        this.setAll(this.FormRegisterSpecial, null);
        $("#close").click();
      }else{
        alert(data.message);
      }
     
      console.log("Regis()=>", data );
    },(error)=>{
      console.error("Regis()=>", error );
    })
    console.log("onSendRegister()=>", this.FormRegister);
  }

  async onSendRegister(){
    if(this.FormRegister.username == '' || this.FormRegister.email == '' || this.FormRegister.tel == '' || this.FormRegister.password == ''){
      alert("Input Invald!");
      return;
    }
    
    let post = {
      "email":    this.FormRegister.email,
      "phone":    this.FormRegister.tel,
      "username": this.FormRegister.username,
      "password": this.FormRegister.password
    };

    let regis = await this.restful.postHTTP('/register',post);
    regis.subscribe((data: any) => {
      if(data.type == "OK"){
        this.setAll(this.FormRegister, "");
        $("#close").click();
      }else{
        alert(data.message);
      }
     
      console.log("Regis()=>", data );
    },(error)=>{
      console.error("Regis()=>", error );
    })
    console.log("onSendRegister()=>", this.FormRegister);
  }

  setFormRegister(active: boolean){
    this.IsGeneralMember = active;
    this.FormName = this.IsGeneralMember === true ? 'Form Register Member' : 'Form Register Special Member';
    console.log(active);
  }

  setAll = (obj, val) => Object.keys(obj).forEach(k => obj[k] = val);
}
