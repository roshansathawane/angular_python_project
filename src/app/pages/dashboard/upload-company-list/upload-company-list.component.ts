import { Component } from '@angular/core';
import { UploadCompanyListService } from '../../../service/upload-company-list.service';
import { HttpClient } from '@angular/common/http';
import { GlobalModalService } from '../../../service/global/success-error-model/global-modal-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarService } from '../../../service/global/sidebar/sidebar.service';
import { ApiResponse } from '../../../model/api.response';
import { response } from 'express';
import { ExcelSheetServiceService } from '../../../service/excel-sheet-service.service';
import { SuccessErrorModalService } from '../../../service/global/global-modal/success-error-modal.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-upload-company-list',
  templateUrl: './upload-company-list.component.html',
  styleUrl: './upload-company-list.component.scss'
})
export class UploadCompanyListComponent {



  dashFilterForm!: FormGroup;
  totalRows: any = 10;
  startindex: any = 1;
  endIndex: any = this.totalRows;
  countrows: any;
  filesData: any[] = [];
  companyCatg: any = "AOP";

  excel_name: string = '';
  company_name: string = '';
  phone_no: string = '';
  address: string = '';
  apiResponse: any;
  token_no : any;
  list_of_token: any;
  list_of_excel : any;
  list_of_Incomp_excel: any;
  loading: boolean = false;
  


  
  emails :any;
  phones :any;
  website : any;
  official_website: any;
  data: any[] = [];
  companyNames: string[] = [];
  totalCompanies: number = 0;
  processedCompanies: number = 0;
  companyResults: any[] = [];
  company_Name: any

  processCompleted: boolean = false;
  token : number= 0;
  loading1 = false;
  originalFile : any;
  processedCompanyNames: Set<string> = new Set<string>();
  remainingCompanyNames: string[] = [];
  processTerminatedUnexpectedly: boolean = false;
  total_count: any;
  processing: boolean = false;
  fileToUpload: File | undefined ;
  updateInterval: any;
  emailCheckboxChecked: boolean = false;
  errorMessage: any;



  companyDetailsList: any = [];
  constructor(private formBuilder: FormBuilder, private router: Router, private sidebarService: SidebarService,  private success_error_Modal: SuccessErrorModalService,
    private uploadCompanyService: UploadCompanyListService, private http: HttpClient, public globalService: GlobalModalService, private excelSheetService:ExcelSheetServiceService
  ) {

   
   }

  ngOnInit(): void {

   

    this.dashFilterForm = this.formBuilder.group({
      token_no : [''],
      EXCEL_NAME: [''],
      COMPANY_NAME: [''],
      PHONE_NO: [''],
      address: [''],

    });
    this.getfetchDashboardData();
    // this.token_list();
    this.setupTokenAndExcelList();


  }

  
  pagiBack() {
    if (this.startindex !== 1) {
      this.startindex = this.startindex - this.totalRows;
      this.endIndex = this.endIndex - this.totalRows;
      console.log("start index : " + this.startindex);
      console.log("end index : " + this.endIndex);
      this.getfetchDashboardData();
    }

  }
  pagiForward() {
    if (this.endIndex < this.countrows) {
      this.startindex = this.startindex + this.totalRows;
      this.endIndex = this.endIndex + this.totalRows;
      console.log("start index : " + this.startindex);
      console.log("end index : " + this.endIndex);
      this.getfetchDashboardData();
    }
  }

 

  


  setSideBar(message: string) {
    this.sidebarService.setSideBar(message);
  }


  pagintn_num_set() {
    console.log("pagi direct function ");
    let paginum: any;
    paginum = this.endIndex / 10;
    let pagitn_num_id = document.getElementById('pagitn_num_id') as HTMLInputElement | null;
    if (pagitn_num_id) {
      pagitn_num_id.value = paginum;
    }
  }

  


  // getfetchDashboardData(): void {
  //   this.globalService.showProgressIndicator();

  //   console.log("excel_name . : " + this.excel_name + "  company_name : " + this.company_name + " phone_no: " + this.phone_no +
  //     "endIndex : " + this.endIndex +
  //     "       address : " + this.address);

  //   const filterTranData = {
  //     startindex: encodeURIComponent(this.startindex),
  //     endIndex: encodeURIComponent(this.endIndex),
  //     EXCEL_NAME: encodeURIComponent(this.excel_name),
  //     COMPANY_NAME: encodeURIComponent(this.company_name),
  //     PHONE_NO: encodeURIComponent(this.phone_no),

  //     address: encodeURIComponent(this.address)
  //   }


  //   this.uploadCompanyService.getCompanyDetailsFilteredDataCount(filterTranData

  //   ).subscribe((response: any) => {
  //     this.countrows = JSON.stringify(response.count);
    
  //     console.log('response------------'+ JSON.stringify(response));
  //     console.log('this.countrows------------'+JSON.stringify(response.count));
  //     console.log('countrows------------'+this.countrows);

  //     if (this.countrows > 0) {
  //       this.getAopcompanyDashboardData(filterTranData);
  //     } else {
  //       setTimeout(() => {
  //         this.globalService.hideProgressIndicator();
  //       }, 100);
  //     }
  //     const countLabelId = document.getElementById('counttableid') as HTMLButtonElement;
  //     if (countLabelId) {
  //       countLabelId.innerText = "Count : " + response.count;
  //     }
  //   }, (error: any) => {
  //     console.error('Error occurred:', error);
  //     setTimeout(() => {
  //       this.globalService.hideProgressIndicator();
  //     }, 100);
  //   });

  //   this.pagintn_num_set();

  // }



  getfetchDashboardData(): void {
    this.loading = true;
    this.globalService.showProgressIndicator();

    const filterTranData = {
      startindex: encodeURIComponent(this.startindex),
      endIndex: encodeURIComponent(this.endIndex),
      EXCEL_NAME: encodeURIComponent(this.excel_name),
      COMPANY_NAME: encodeURIComponent(this.company_name),
      PHONE_NO: encodeURIComponent(this.phone_no),
      address: encodeURIComponent(this.address),
      token: encodeURIComponent (this.token_no),
      
    }
    this.uploadCompanyService.getCompanyDetailsFilteredDataCount(filterTranData).subscribe
    ((response: any) => {
      this.loading = false;
      this.apiResponse = response;
      console.log('this.apiResponse.result---------'+this.apiResponse.result)
      if(this.apiResponse.status === 200  && this.apiResponse.result > 0){
        this.countrows= this.apiResponse.result
        this.getAopcompanyDashboardData(filterTranData);
    
        //  this.updateTokenList();

        const countLabelId = document.getElementById('counttableid') as HTMLButtonElement;
      if (countLabelId) {
        countLabelId.innerText = "Count : " + response.result;
      }else{
        this.loading = false;
        setTimeout(() => {
          this.globalService.hideProgressIndicator();
        }, 100);
      }
      }
    }, (error: any) => {
      console.error('Error occurred:', error);
      this.loading = false;
      setTimeout(() => {
        this.globalService.hideProgressIndicator();
      }, 100);
    });

    this.pagintn_num_set();

  }



getAopcompanyDashboardData(filterTranData: { startindex: string; endIndex: string; EXCEL_NAME: string; COMPANY_NAME: string; PHONE_NO: string; address: string; token : string}) {
  this.uploadCompanyService.getCompanyDetailsFilteredData(filterTranData).subscribe
  ((response: any) => {
      this.apiResponse = response;
      if(this.apiResponse.status === 200 ){
        this.companyDetailsList = this.apiResponse.result;
        // console.log('this.companyDetailsList--------------55--'+JSON.stringify(this.companyDetailsList))
        this.loading = false;
      }else{
        console.error('Error in response:', Response);
        this.loading = false;
      }
  },(error: any) => {
          this.loading = false;
          console.error('Error occurred:', error);
          setTimeout(() => {
              this.globalService.hideProgressIndicator();
        }, 100);
    });
}



onDataModeChange(mode: 'all' | 'bulk' | 'single') {
  if (mode === 'all') {
    this.companyDetailsList = this.apiResponse.result;
  } else if (mode === 'bulk') {
    this.companyDetailsList = this.apiResponse.result.filter((company: any) => company.EXCEL_NAME);
  } else if (mode === 'single') {
    this.companyDetailsList = this.apiResponse.result.filter((company: any) => !company.EXCEL_NAME || company.EXCEL_NAME.trim() === '');
  }
}



setupTokenAndExcelList() {
  const tokenInput = document.getElementById('token_no') as HTMLInputElement;
  const excelInput = document.getElementById('EXCEL_NAME') as HTMLInputElement;
  const incomp_excelInput = document.getElementById('IN_C_EXCEL_NAME') as HTMLInputElement;

  if (tokenInput) {
      tokenInput.addEventListener('input', this.fetchTokenList.bind(this));
  }
  if (excelInput) {
      excelInput.addEventListener('input', this.fetchExcelList.bind(this));
  }
  if(incomp_excelInput){
    incomp_excelInput.addEventListener('input', this.fetch_Incomp_ExcelList.bind(this));
  }

}


fetchTokenList() {
  this.uploadCompanyService.get_tokenlist().subscribe(
    (response: any) => {
      this.apiResponse = response;
      if(this.apiResponse && this.apiResponse.status === 200){
      this.list_of_token = this.apiResponse.result    
      this.updateTokenList();
      }else{
        console.log('Some thing went wrong')
      }
    },
    (error: any) => {
      console.error('Error occurred:', error);

    }
  );
}


fetchExcelList() {
  this.uploadCompanyService.get_Excellist().subscribe(
    (response: any) => {
      this.apiResponse = response;
      if(this.apiResponse && this.apiResponse.status === 200){
      this.list_of_excel = this.apiResponse.result  
      this.updateExcelList();
      }else{
        console.log('Some thing went wrong')
      }
    },
    (error: any) => {
      console.error('Error occurred:', error);

    }
  );
}


fetch_Incomp_ExcelList(){
  this.uploadCompanyService.get_Incomp_Excellist().subscribe(
    (response: any) => {
      this.apiResponse = response;
      if(this.apiResponse && this.apiResponse.status === 200){
      this.list_of_Incomp_excel = this.apiResponse.result 

      console.log('this.list_of_Incomp_excel---------'+this.list_of_Incomp_excel)

      this.update_IncompExcelList();
      }else{
        console.log('Some thing went wrong')
      }
    },
    (error: any) => {
      console.error('Error occurred:', error);

    }
  );
}



updateTokenList() {
  const token_list = document.getElementById('tokenList');
  if (token_list) {
      token_list.innerHTML = ''; 
      this.list_of_token.forEach((token: string) => {
          const option = document.createElement('option');
          option.value = token;
          token_list.appendChild(option);
      });
  }
}


// updateExcelList() {
//   const excel_list = document.getElementById('excelList');
//   if (excel_list) {
//       excel_list.innerHTML = ''; 
//       this.list_of_excel.forEach((company: string) => {
//           const option = document.createElement('option');
//           option.value = company;
//           excel_list.appendChild(option);
//       });
//   }
// }

updateExcelList() {
  const excel_list = document.getElementById('excelList');
  if (excel_list) {
    excel_list.innerHTML = '';
    this.list_of_excel
      .filter((company: string) => this.isValidExcelName(company))
      .forEach((company: string) => {
        const option = document.createElement('option');
        option.value = company;
        excel_list.appendChild(option);
      });
  }
}

isValidExcelName(company: string | null | undefined): boolean {
  return typeof company === 'string' && company.trim() !== '';
}

// updateExcelList() {
//   const excel_list = document.getElementById('excelList');
//   if (excel_list) {
//     excel_list.innerHTML = '';
//     this.list_of_excel.forEach((company: string) => {
//       const option = document.createElement('option');
//       option.value = company;
//       // option.text = company; // Add this line to set the text of the option
//       excel_list.appendChild(option);
//     });
//   }
// }

// update_IncompExcelList() {
//   const Incomp_excel_list = document.getElementById('in_c_excelList');
//   if (Incomp_excel_list) {
//     Incomp_excel_list.innerHTML = '';
    
//     this.list_of_Incomp_excel
//       .filter((item: any[]) => item[1] === 'N') 
//       .forEach((item: any[]) => {
//         const option = document.createElement('option');
//         option.value = item[0]; 
//         // option.text = item[0]; 
//         Incomp_excel_list.appendChild(option);
//       });
//   }
// }


update_IncompExcelList() {
  const Incomp_excel_list = document.getElementById('in_c_excelList');
  if (Incomp_excel_list) {
    Incomp_excel_list.innerHTML = '';

    this.list_of_Incomp_excel
      .filter((item: any[]) => item[1] === 'N') // Only include items where flag is 'N'
      .forEach((item: any[]) => {
        const option = document.createElement('option');
        option.value = item[0];
        option.text = item[0]; // Display the value as the text
        Incomp_excel_list.appendChild(option);
      });
  }
}


  reset() {
    this.dashFilterForm.reset();
    this.excel_name = '';
    this.company_name = '';
    this.phone_no = '';
    this.address = '';
    this.getfetchDashboardData();
  }

  onSubmit() {
    this.loading = true;
    this.token_no = this.dashFilterForm.value.token_no;
    this.excel_name = this.dashFilterForm.value.EXCEL_NAME;
    this.company_name = this.dashFilterForm.value.COMPANY_NAME;
    this.phone_no = this.dashFilterForm.value.PHONE_NO;
    this.address = this.dashFilterForm.value.address;
    this.getfetchDashboardData();

    console.log('this.token_no----------'+this.token_no)
  }

  

  onProcessButtonClick(company: any): void {
    this.processCompleted = true;
    if (company.FLAG === 'N') {
      this.success_error_Modal.openErrorModal('Process Is Not Completed')
    } else {
      this.router.navigate(['/companyDetailDash', company.TOKEN_NO]);
    }
  }
 
 
  
  //  ---------excel file process start code--------

  
  // send_TokenNo(token: number): void {
  //   this.token_no = token
  //   console.log('token---2-----'+token)
  //   this.loading = true;
  //   this.processing = true;
  //     this.excelSheetService.getExcelSheetData(token).subscribe(
  //       response => {
  //         this.apiResponse = response;
  //         this.total_count= +this.apiResponse.count
  //         console.log('this.total_count------------'+this.total_count)
  //         console.log('this.apiResponse------------'+JSON.stringify(this.apiResponse))
  //         if (this.apiResponse && this.apiResponse.status === 200) {
  //           const companyNames = this.apiResponse.company_names;
  //           this.processCompanyNames(companyNames, 0);
  //         } else {
  //           console.log("Token not found")
  //         }
  //       },
  //       error => {
  //         this.processing = false;
  //         this.errorMessage = error;
  //       }
  //     );
  //   }





  // private processCompanyNames(companyNames: string[], index: number = 0) {
  //   if (index >= companyNames.length) {
  //     this.loading = false;
  //     this.processCompleted = true;
  //     this.success_error_Modal.openSuccessModal('Process completed', () => {
  //       this.companyResults = [];
  //     });
  //     return;
  //   }

  
  // const companyName = companyNames[index];
  //   if (this.processedCompanyNames.has(companyName)) {
  //     this.success_error_Modal.openSuccessModal(
  //       `${companyName} has already been processed.`,
  //       () => this.processCompanyNames(companyNames, index + 1) 
  //     );
  //     return;
  //   }  
  

  //   this.excelSheetService.searchexcelFile({ companyName, token: this.token_no}).subscribe(
  //     response => {      
  //       const responseObject = response;   
  //       console.log('responseObject---------'+responseObject)
  //       console.log('responseObject---------'+JSON.stringify(responseObject))
  //       if (responseObject && responseObject.status === 200) {
  //         console.log(`Processing company: ${companyNames[index]}`);
  //         const result: any = { companyNo: this.processedCompanies + 1, companyName: companyName, website: '', official_website: '', emails: '', phones: '', completed: false };
  
  //         if (responseObject.PlaywrightResults && responseObject.PlaywrightResults.length > 0) {
  //           result.website = responseObject.PlaywrightResults.join(',\n');
  //           result.official_website = responseObject.PlaywrightResults[0];
  //         } else {
  //           console.log('No website found from PlaywrightResults');
  //         }
  
  //         if (responseObject.ScrapyResults) {
  //           const scrapyData = responseObject.ScrapyResults;
  
  //           const emailsMatch = scrapyData.match(/final_emails------------\[([^[]+)\]/);
  //           if (emailsMatch && emailsMatch.length > 1) {
  //             const emailsData = emailsMatch[1];
  //             result.emails = emailsData
  //               .match(/'([^']+)'/g)
  //               .map((email: string) => email.replace(/'/g, ''))
  //               .join(',\n');
  //             console.log('Final Emails:-----------', result.emails);
  //           } else {
  //             console.log('No final emails found');
  //           }
  
  //           const phonesMatch = scrapyData.match(/final_phones------------\[([^[]+)\]/);
  //           if (phonesMatch && phonesMatch.length > 1) {
  //             const phonesData = phonesMatch[1];
  //             result.phones = phonesData
  //               .match(/'([^']+)'/g)
  //               .map((phone: string) => phone.replace(/'/g, ''))
  //               .join(',\n');
  //             console.log('Final Phones:----------------', result.phones);
  //           } else {
  //             console.log('No final phones found');
  //           }
  //         }
  //         result.completed = true;
  //         this.companyResults.push(result);
  //         this.processedCompanies++;
  //         this.processedCompanyNames.add(companyName);
  //         this.processCompanyNames(companyNames, index + 1); 
  //       } else {
          
  //         this.loading = true;
  //         this.errorMessage = 'Website not found';
  //         this.companyResults.push({
  //           companyNo: this.processedCompanies + 1,
  //           companyName: companyName,
  //           website: 'Website not found',
  //           official_website: '',
  //           emails: '',
  //           phones: '',
  //           completed: true,
  //           error: true
  //         });
  //         this.processedCompanies++;
  //         this.processedCompanyNames.add(companyName);
  //         this.processCompanyNames(companyNames, index + 1); 
  //       }
  //     },
  //     error => {
  //       this.loading = true;
  //       this.errorMessage = 'Error searching company ' + companyName;
  //       console.error('Error searching company', companyName, ':', error);

  //       this.companyResults.push({
  //         companyNo: this.processedCompanies + 1,
  //         companyName: companyName,
  //         website: 'Error searching company',
  //         official_website: '',
  //         emails: '',
  //         phones: '',
  //         completed: true,
  //         error: true
  //       });
  //       this.processedCompanies++;
  //       this.processedCompanyNames.add(companyName);
  //       this.processCompanyNames(companyNames, index + 1); 
  //     }
  //   );
  // }


  delete_record(token: number):void{
    this.excelSheetService.delete_ExcelSheetData(token).subscribe(
      (response: any) => {
        this.apiResponse = response;
        if (this.apiResponse && this.apiResponse.status === 200) { 
          this.success_error_Modal.openSuccessModal(`${token}  Record delete successfully`)
          window.location.reload();
        } else {
          console.log("Token not found")
        }
      },
      (error: any) => {
        this.processing = false;
        this.errorMessage = error;
      }
    );

  }
   


download_excel(token: number): void {
  this.processing = true;
  this.excelSheetService.download_excelsSheetData(token).subscribe(
    (response: Blob) => {
      this.processing = false;
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'company_data.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      this.processCompleted = true;
      this.success_error_Modal.openSuccessModal("File download successfully");
        

    },
    (error: any) => {
      this.processing = false;
      this.errorMessage = error.message;
      console.log("Token not found");
      this.success_error_Modal.openErrorModal('Some thing went Wrong')
    }
  );
}




}