import { Component } from '@angular/core';
import { SystemsService } from './services/systems.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'WebAngularManagerApp';
  constructor(
  private systemService: SystemsService){
  }
}