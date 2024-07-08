import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../model/api.response';

@Injectable({
  providedIn: 'root'
})
export class UploadCompanyListService {

  apiBaseUrl = environment.apiBase;
  
  constructor(private router: Router,private http: HttpClient) { }

  getCompanyDetailsFilteredData(filterTranData: any): Observable<ApiResponse> {
    console.log("this.filterTranData.  Count..................."+filterTranData);
    return this.http.post<ApiResponse>(this.apiBaseUrl + 'getcomapnyDataGridDetails', filterTranData);
  }

  getCompanyDetailsFilteredDataCount(filterTranData: any): Observable<ApiResponse> {
    console.log("this.filterTranData....Data....................."+filterTranData);
 return this.http.post<ApiResponse>(this.apiBaseUrl + 'getcompanyDashFiltTableCount', filterTranData);

  }

  get_tokenlist(): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl + 'get_tokenlist');
  }

  get_Excellist(): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl + 'get_excellist');
  }

  get_Incomp_Excellist(): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl + 'get_incomp_excellist');
  }

}
