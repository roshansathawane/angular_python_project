import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor(private httpClient: HttpClient) {}

  apiBaseUrl = environment.apiBase;
   
  // authenticate(username:any, password:any) {
  //   return this.httpClient
  //     .post<any>(environment.apiBase+"token/generate-token", { username, password })
  //     .pipe(
  //       map(userData => {
  //         //alert(JSON.stringify(userData))
  //         sessionStorage.setItem("entity",userData.result.entityCode);
  //         sessionStorage.setItem("divCode",userData.result.divCode);
  //         sessionStorage.setItem("accYear",userData.result.accYear);
  //         let tokenStr =  userData.result.token;
  //         sessionStorage.setItem("token", tokenStr);
  //         return userData;
  //       })
  //     );
  // }



  authenticate(login_Credential : {username:any, password:any}): Observable<Response> {
    return this.httpClient.post<Response>(this.apiBaseUrl + 'login', login_Credential);
  }



  
  isUserLoggedIn() {
    let user = sessionStorage.getItem("sessionId");
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem("sessionId");
  }

  demo(){
    return this.httpClient.get<any>(environment.apiBase+"/tsFun");
  }
}