import { Injectable } from '@angular/core';
import LoadFileConfig from '../../assets/config/config.inc.json';
import { IFconfig } from '../models/master.model';

@Injectable({
  providedIn: 'root'
})
export class SystemsService {
  private FileConfig: IFconfig = null;/**PublicSystemConfig form FILE JSON */
  http_url = "";
  private autoLoadConfig = null;

  constructor() { 
    this.ReadFileConfig();/**Read Config Josn File */
  }

  private async AutoLoadConfig(){
    if(this.autoLoadConfig == null){
      this.ClearAutoLoadConfig();
      this.autoLoadConfig = setInterval(() => {
        //Auto Script
      }, 60000);
    }
  }

  private ClearAutoLoadConfig(){
    clearInterval(this.autoLoadConfig);
  }

  private ReadFileConfig(){
    this.FileConfig = LoadFileConfig as unknown as IFconfig;

    this.setConfig();
  }

  private setConfig(){
    this.http_url = (this.FileConfig.REST_API_SERVER == "" || 
                     this.FileConfig.REST_API_SERVER == "http://127.0.0.1"
    ? "http://localhost" :  this.FileConfig.REST_API_SERVER) + 
    (this.FileConfig.REST_API_PORT == 80 ? "" : ":" +this.FileConfig.REST_API_PORT) + "/" +
     this.FileConfig.REST_API_ENPOINT + "/" +
     this.FileConfig.REST_API_VERSION;
     console.log(this.http_url);
  }

  /**
   * Function getConfig Varible
   */
  getConfigFile(){
    return this.FileConfig;
  }

  
}
