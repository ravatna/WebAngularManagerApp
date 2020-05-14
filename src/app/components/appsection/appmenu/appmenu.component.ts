import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.scss']
})

export class AppmenuComponent implements OnInit {

  public appname: string;
  public ownerShop: string;
  public ownImage: string;

  constructor() { 
    this.appname = "Example Shop";
    this.ownerShop = "Example Shop";
    this.ownImage = "";

    // setTimeout(() => {
    //   this.appname = "Wuttichai Shop";
    //   this.ownerShop = "Mr.Wuttichai";
    //   this.ownImage ="https://lh3.googleusercontent.com/-Ak34tPTgnUQ/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJPwGpNurBV_pqnjL6G4dZX-0Eqrew.CMID/s64-c/photo.jpg";
    //   let imgLogo = document.getElementById('devlogo') as HTMLImageElement;
    //   if(imgLogo != null){ imgLogo.src = this.ownImage; }else{ console.log("Not Found OwnerImageLogo"); }
    // },100);


  }//.END-constructor()

  ngOnInit(): void {
  }

}
