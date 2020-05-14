import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders} from '@angular/common/http';
// import { Http, Headers, RequestOptions } from '@angular/http';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { SystemsService } from './systems.service';
import { IFconfig } from '../models/master.model';

@Injectable({
  providedIn: 'root'
})
export class RestfullService {
  private REST_API_SERVER = "";
  private FileConfig: IFconfig = null;/**PublicSystemConfig form FILE JSON */
  
  constructor(
    private systemService: SystemsService,
    private httpClient: HttpClient) { 

      this.REST_API_SERVER = this.systemService.http_url;/** Read */
      this.FileConfig = this.systemService.getConfigFile();/**Read Config Json File */
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public sendGetRequest(){
    return this.httpClient.get(this.REST_API_SERVER);
  }

  public sendGetRequestCatch(){
    return this.httpClient.get(this.REST_API_SERVER).pipe(catchError(this.handleError));
  }

  ///deleteCategory/:id
  public getDeletecategory(id: string){
    return this.httpClient.get(this.REST_API_SERVER+'/deleteCategory/'+id).pipe(catchError(this.handleError));
  }

  public postHTTP(URl: string, PostData: any ){
    // X-FORM : 'Content-Type': 'application/x-www-form-urlencoded'
    // X-JSON : "Accept": 'application/json'
    let headers =  {headers: new  HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json'})};
    return this.httpClient.post(this.REST_API_SERVER+'/'+URl, PostData, headers).pipe(catchError(this.handleError));
  }

  ///deleteProduct/:id
  public getdeleteProduct(id: string){
    return this.httpClient.get(this.REST_API_SERVER+'/deleteProduct/'+id).pipe(catchError(this.handleError));
  }
  
  
  public getCategory(){
    return this.httpClient.get(this.REST_API_SERVER+'/getCategory').pipe(catchError(this.handleError));
  }

  public getCategoryByID(id:string){
    return this.httpClient.get(this.REST_API_SERVER+'/getCategory/'+id).pipe(catchError(this.handleError));
  }

  public getProduct(){
    return this.httpClient.get(this.REST_API_SERVER+'/getProduct').pipe(catchError(this.handleError));
  }

  public sendGetRequestRetry(){
    return this.httpClient.get(this.REST_API_SERVER).pipe(retry(3), catchError(this.handleError));
  }


  public sendGetRequestParams(){
    // Add safe, URL encoded_page parameter 
    const options = { params: new HttpParams({fromString: "_page=1&_limit=20"}) };
    return this.httpClient.get(this.REST_API_SERVER, options).pipe(retry(3), catchError(this.handleError));
  }
}
