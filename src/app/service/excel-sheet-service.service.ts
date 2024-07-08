import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelSheetServiceService {

  apiBaseUrl = environment.apiBase;
  // apiBaseUrl = 'http://localhost:5000/';

  constructor(private httpClient: HttpClient) { }

  uploadExcelSheet(formData: FormData): Observable<Response> {
    console.log("formData------"+formData);
    return this.httpClient.post<Response>(this.apiBaseUrl + 'upload', formData);
  }

  getExcelSheetData(token: number): Observable<Response> {
    return this.httpClient.get<Response>(`${this.apiBaseUrl}getComapnyName/${token}`);
    
  }


  updateCompanyData(formData: FormData): Observable<Response> {
    return this.httpClient.post<Response>(this.apiBaseUrl + 'details/updateData', formData);
  }


  // -----------------------------------------------------------------


  // searchexcelFile(companyData: { companyName: string, token: number, originalFile: string }): Observable<any> {
  //   return this.httpClient.post<any>(this.apiBaseUrl + 'searchCompany', companyData);
  // }

 

  searchexcelFile(companyData: { companyName: string, token :number, selectedDetails: string[] }): Observable<any> {
    return this.httpClient.post<any>(this.apiBaseUrl + 'searchCompany', companyData);
  }

  searchCompanyName(companyData: { companyName: string}): Observable<any> {
    return this.httpClient.post<any>(this.apiBaseUrl + 'searchsingleCompanyName', companyData);
  }

  sendWebsites(websites: string[]): Observable<any> {
    return this.httpClient.post<any>(this.apiBaseUrl + 'companyContactDetails', websites);
  }


  getcontact(token: number): Observable<Response> {
      return this.httpClient.get<Response>(`${this.apiBaseUrl}get_contact_details_db/${token}`);
      
  }


  saveCompanyData(companyData: { detailsToSave: string, zaub_website: string, zaub_email: string, zaub_address: string, zaub_director_details: string }): Observable<any> {
    return this.httpClient.post<any>(this.apiBaseUrl + 'saveSingleCompanyData', companyData);
  }

  delete_ExcelSheetData(token: number):Observable<Response> {
    return this.httpClient.get<Response>(`${this.apiBaseUrl}delete_record/${token}`);
}



download_excelsSheetData(token: number): Observable<Blob> {
  console.log('token---------- service-----' + token);
  return this.httpClient.get(`${this.apiBaseUrl}download_excel/${token}`, { responseType: 'blob' });
}

}
