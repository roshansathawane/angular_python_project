import { Injectable } from '@angular/core';
import { ApiResponse } from '../model/api.response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyDetailsListService {
 
  apiBaseUrl = environment.apiBase;
  
  constructor(private http: HttpClient) { }

  getCompanyFilteredData(filterTranData: { startindex: string; endIndex: string; EXCEL_NAME: string; COMPANY_NAME: string; PHONE_NO: string; address: string;  From_date: string; to_date: string}, companyTokenNo: number) {   
    return this.http.post<ApiResponse>(`${this.apiBaseUrl}getcomapnyDetailsDataGrid/${companyTokenNo}`, filterTranData);
    
  }
  getCompanyFilteredDataCount(filterTranData: { startindex: string; endIndex: string; EXCEL_NAME: string; COMPANY_NAME: string; PHONE_NO: string; address: string; }, companyTokenNo: number) {
    return this.http.post<ApiResponse>(`${this.apiBaseUrl}getcompanyDetailsDashFiltTableCount/${companyTokenNo}`, filterTranData);
  }


  get_zaubDetails(companyName: string, companyTokenNo: number): Observable<any> {
    return this.http.post(this.apiBaseUrl + 'get_zaubDetails', { companyName , companyTokenNo});
  }


  // save_zaubData_db(filterTranData: { companyTokenNo: string; company_name: string; websiteUrl: string; email: string; address: string }): Observable<any> {
  //   return this.http.post(this.apiBaseUrl + 'save_zaubDetails', filterTranData);
  // }
  save_zaubData_db(filterTranData: { companyTokenNo: string; company_name: string;  zaub_result:string }): Observable<any> {
    return this.http.post(this.apiBaseUrl + 'save_zaubDetails', filterTranData);
  }

 



}
