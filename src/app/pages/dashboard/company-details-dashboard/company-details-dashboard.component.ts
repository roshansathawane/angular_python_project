import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompanyDetailsListService } from '../../../service/company-details-list.service';
import { HttpClient } from '@angular/common/http';
import { GlobalModalService } from '../../../service/global/success-error-model/global-modal-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarService } from '../../../service/global/sidebar/sidebar.service';
import { response } from 'express';
import { SuccessErrorModalService } from '../../../service/global/global-modal/success-error-modal.service';
import { ExcelSheetServiceService } from '../../../service/excel-sheet-service.service';

@Component({
  selector: 'app-company-details-dashboard',
  templateUrl: './company-details-dashboard.component.html',
  styleUrl: './company-details-dashboard.component.scss'
})
export class CompanyDetailsDashboardComponent {


  modalContent: any;
  company_url: any;
  company_address: any;
  zaub_phone_no: any;
  modal_phone_no: any;
  companyTokenNo: any;
  dashFilterForm!: FormGroup;
  totalRows: any = 10;
  startindex: any = 1;
  endIndex: any = this.totalRows;
  countrows: any;
  filesData: any[] = [];
  companyCatg: any = "AOP";
  heading_type: any;
  excel_name: string = '';
  company_name: string = '';
  phone_no: string = '';
  address: string = '';


  websiteUrl: string = '';
  email: string = '';

  companyDetailsList: any = [];
  apiResponse: any;
  todate: string = '';
  fromdate: string = '';
  loading: boolean = false;
  zauba_details : any;
  errorMessage: any;

  // ---------

  

  
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
  token_no : any;
  zaub_result_data: any
  zaub_url: string= '';
  zaub_address: string = '';
  zaub_email: string = '';
  zaub_director_details: string = '';
  // errorMessage: any;
// -------------------

  

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private sidebarService: SidebarService, private excelSheetService:ExcelSheetServiceService, 
    private companyDetailsService: CompanyDetailsListService, private http: HttpClient, public globalService: GlobalModalService, private success_error_Modal: SuccessErrorModalService
  ) { 
    
   
  }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.companyTokenNo = params['id'];
      console.log('Company ID:', this.companyTokenNo);
        this.loading = true;
    });

    this.dashFilterForm = this.formBuilder.group({
      EXCEL_NAME: [''],
      COMPANY_NAME: [''],
      PHONE_NO: [''],
      address: [''],
      From_date: [''], 
      to_date: [''],

    });
    this.getfetchDashboardData();



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


  //   this.companyDetailsService.getCompanyFilteredDataCount(filterTranData, this.companyTokenNo).subscribe(
  //     (response: any) => {
  //     this.apiResponse = response;

  
  //     if (this.apiResponse.count > 0) {
  //       this.getAopcompanyDashboardData(filterTranData, this.companyTokenNo);
  //     } else {
  //       setTimeout(() => {
  //         this.globalService.hideProgressIndicator();
  //       }, 100);
  //     }
  //     const countLabelId = document.getElementById('counttableid') as HTMLButtonElement;
  //     if (countLabelId) {
  //       countLabelId.innerText = "Count : " + this.apiResponse.count;
  //     }
  //     console.log("count response : " + this.apiResponse.count);
  //   }, (error: any) => {
  //     console.error('Error occurred:', error);
  //     setTimeout(() => {
  //       this.globalService.hideProgressIndicator();
  //     }, 100);
  //   });

  //   this.pagintn_num_set();

  // }



  
  getfetchDashboardData(): void {
    this.globalService.showProgressIndicator();
    // const filterTranData = {
    //   startindex: encodeURIComponent(this.startindex),
    //   endIndex: encodeURIComponent(this.endIndex),
    //   EXCEL_NAME: encodeURIComponent(this.excel_name),
    //   COMPANY_NAME: encodeURIComponent(this.company_name),
    //   PHONE_NO: encodeURIComponent(this.phone_no),
    //   address: encodeURIComponent(this.address)
    // }

    const filterTranData = {
      startindex: this.startindex,
      endIndex: this.endIndex,
      EXCEL_NAME: this.excel_name,
      COMPANY_NAME: this.company_name,
      PHONE_NO: this.phone_no,
      address: this.address,
      From_date: this.fromdate,
      to_date: this.todate
    }


    this.companyDetailsService.getCompanyFilteredDataCount(filterTranData, this.companyTokenNo).subscribe(
      (response: any) => {
      this.apiResponse = response;
      this.getAopcompanyDashboardData(filterTranData, this.companyTokenNo);
      if(this.apiResponse.status === 200 && this.apiResponse.result > 0){
      
        // this.getAopcompanyDashboardData(filterTranData, this.companyTokenNo);

      const countLabelId = document.getElementById('counttableid') as HTMLButtonElement;
      if (countLabelId) {
        countLabelId.innerText = "Count : " + this.apiResponse.result;
      }
      }else{
        this.loading = false;
        setTimeout(() => {
          this.globalService.hideProgressIndicator();
        }, 100);
      }
  
    }, (error: any) => {
      this.loading = false;
      console.error('Error occurred:', error);
      setTimeout(() => {
        this.globalService.hideProgressIndicator();
      }, 100);
    });

    this.pagintn_num_set();

  }




  // getAopcompanyDashboardData(filterTranData: { startindex: string; endIndex: string; EXCEL_NAME: string; COMPANY_NAME: string; PHONE_NO: string; address: string; }, companyTokenNo: any) {
  //   this.companyDetailsService.getCompanyFilteredData(filterTranData, this.companyTokenNo

  //   ).subscribe((response: any) => {
  //     console.log('response------1---'+JSON.stringify(response))
  //     this.apiResponse = response;
  //     this.companyDetailsList = this.apiResponse.company_details;
  //   }, (error: any) => {
  //     console.error('Error occurred:', error);
  //     setTimeout(() => {
  //       this.globalService.hideProgressIndicator();
  //     }, 100);
  //   });
  // }

  
  getAopcompanyDashboardData(filterTranData: { startindex: string; endIndex: string; EXCEL_NAME: string; COMPANY_NAME: string; PHONE_NO: string; address: string; From_date :string; to_date: string}, companyTokenNo: any) {
    this.companyDetailsService.getCompanyFilteredData(filterTranData, this.companyTokenNo).subscribe
    ((response: any) => {
      this.apiResponse = response;
      if(this.apiResponse.status === 200){
        this.companyDetailsList = this.apiResponse.result;
        console.log('this.companyDetailsList---1--------'+JSON.stringify(this.companyDetailsList))
        this.loading = false;
      }
    }, (error: any) => {
      this.loading = false;
      console.error('Error occurred:', error);
      setTimeout(() => {
        this.globalService.hideProgressIndicator();
      }, 100);
    });
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
    this.excel_name = this.dashFilterForm.value.EXCEL_NAME;
    this.company_name = this.dashFilterForm.value.COMPANY_NAME;
    this.phone_no = this.dashFilterForm.value.PHONE_NO;
    this.address = this.dashFilterForm.value.address;
    this.fromdate = this.dashFilterForm.value.From_date;
    this.todate = this.dashFilterForm.value.to_date;
    this.getfetchDashboardData();
  }

  BackToDashBoard() {
    this.router.navigate(['/uploadCompanyDash']);
  }


  openModal1(companyName: string, websiteUrl: string, phoneNo: string, email: string, zaub_url: string, zaub_address:string, zaub_email: string, zaub_director_details: string) {
    this.company_name = companyName;
    this.websiteUrl = websiteUrl;
    this.phone_no = phoneNo;
    this.email = email;
    this.zaub_url = zaub_url;
    this.zaub_address = zaub_address;
    this.zaub_email = zaub_email;
    this.zaub_director_details= zaub_director_details;

}






getFirstPhoneNumber(phoneNumbers: string): string {
  if (phoneNumbers) {
      const phoneNumberArray = phoneNumbers.split(',').map(num => num.trim());
      const firstTwo_phoneNo = phoneNumberArray.slice(0, 2).join(', ');
      return phoneNumberArray.length > 2 ? `${firstTwo_phoneNo}...` : firstTwo_phoneNo
  }
  return '';
}

getFirstEmail(emails: string): string {
  if (emails) {
      const emailArray = emails.split(',').map(email => email.trim());
      const firstTwoEmails =  emailArray.slice(0, 2).join(', ');
      return emailArray.length > 2 ? `${firstTwoEmails}...` : firstTwoEmails
  }
  return '';
}



// get_zaubData(companyName: string){
//   this.loading = true;
//   this.companyDetailsService.get_zaubDetails(companyName, this.companyTokenNo ).subscribe(
//     (response :any) =>{
//       this.apiResponse = response;
//       if(this.apiResponse.status === 200){
//         console.log('this.apiResponse----5---'+JSON.stringify(this.apiResponse))
//         this.company_name = companyName;
//         this.websiteUrl = this.apiResponse.result.search_results;
//         this.email = this.apiResponse.result.email;
//         this.address = this.apiResponse.result.address; 
//         this.openZaubaModal();
//         this.loading = false;
      
//       }

//     }, 
//     (error: any) =>{
//       console.error('Error occurred:', error);
//       this.errorMessage = 'Error searching company'
//     }
//   )
// }


get_zaubData(companyName: string) {
  this.loading = true;
  this.companyDetailsService.get_zaubDetails(companyName, this.companyTokenNo).subscribe(
    (response: any) => {
      this.apiResponse = response;
      if (this.apiResponse.status === 200) {
        console.log('this.apiResponse----5---' + JSON.stringify(this.apiResponse))
        this.loading = false;
        this.company_name = companyName;
        this.websiteUrl = this.apiResponse.result.result_data.search_results;

        // Print search results, email, and address
        if (this.apiResponse.result.result_data) {
          this.zaub_result_data = this.apiResponse.result.result_data;
        } else {
          console.log('No data found.');
          this.loading = false;
        }

        this.openZaubaModal();
        this.loading = false;

      }

    },
    (error: any) => {
      console.error('Error occurred:', error);
      this.errorMessage = 'Error searching company';
      this.success_error_Modal.openErrorModal('Zauba website not found')
      this.loading = false;
    }
  )
}






openZaubaModal() {
  const modalElement = document.getElementById('zaubaModal');
  if (modalElement) {
    modalElement.classList.add('show');
    modalElement.style.display = 'block';
    modalElement.setAttribute('aria-modal', 'true');
    modalElement.removeAttribute('aria-hidden');

    // Add backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop fade show';
    document.body.appendChild(backdrop);

    // Handle closing the modal when the backdrop is clicked
    backdrop.addEventListener('click', () => {
      this.closeZaubaModal();
    });
  }
}

closeZaubaModal() {
  const modalElement = document.getElementById('zaubaModal');
  if (modalElement) {
    modalElement.classList.remove('show');
    modalElement.style.display = 'none';
    modalElement.setAttribute('aria-hidden', 'true');
    modalElement.removeAttribute('aria-modal');

    // Remove backdrop
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  }
}



save_zaubData(): void {
  const companyData = {
    companyTokenNo: this.companyTokenNo,
    company_name: this.company_name,
    // websiteUrl: this.websiteUrl,
    // email: this.email,
    // address: this.address,
    zaub_result: JSON.stringify(this.zaub_result_data)
  };
  this.companyDetailsService.save_zaubData_db(companyData).subscribe(
    (response: any) => {
      this.apiResponse = response;
      console.log('save_zaubData response---------', this.apiResponse);
      this.success_error_Modal.openSuccessModal('Data Save in Database Successfully', () => {
        this.closeZaubaModal();
      });
      
    },
    (error: any) => {
      console.error('Error occurred:', error);
    }
  );
}

// ---------------------


// send_TokenNo(token: number): void {
//   this.token_no = token
//   this.loading = true;
//   this.processing = true;
//     this.excelSheetService.getExcelSheetData(token).subscribe(
//       response => {
//         this.apiResponse = response;
//         this.total_count= +this.apiResponse.count
//         if (this.apiResponse && this.apiResponse.status === 200) {
//           const companyNames = this.apiResponse.company_names;
//           const flags  = this.apiResponse.flag;
//           this.processCompanyNames(companyNames, flags ,  0);
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




// private processCompanyNames(companyNames: string[], flags:string[], index: number = 0) {
//     if (index >= companyNames.length) {
//       this.loading = false;
//       this.processCompleted = true;
      
//       this.success_error_Modal.openSuccessModal('Process completed', () => {
//         this.companyResults = [];

//         this.dashFilterForm.get('COMPANY_NAME')!.enable();
//         this.dashFilterForm.get('From_date')!.enable();
//         this.dashFilterForm.get('to_date')!.enable();
//       });
//       return;
//     }
  
//     const companyName = companyNames[index];
//     const flag = flags[index];

  
//     if (flag === 'P') {
//     console.log(`${companyName} is marked with flag 'P', skipping...`);
//     this.processCompanyNames(companyNames, flags, index + 1);
//     return;
//   }
  
  
//     if (this.processedCompanyNames.has(companyName)) {
//       this.success_error_Modal.openSuccessModal(
//         `${companyName} has already been processed.`,
//         () => this.processCompanyNames(companyNames, flags, index + 1) 
//       );
//       return;
//     }  
  
  
//     this.excelSheetService.searchexcelFile({ companyName, token: this.token_no}).subscribe(
//       response => {      
//         const responseObject = response;   
//         console.log('responseObject---------'+responseObject)
//         console.log('responseObject---------'+JSON.stringify(responseObject))
//         if (responseObject && responseObject.status === 200) {
//           console.log(`Processing company: ${companyNames[index]}`);
//           const result: any = { companyNo: this.processedCompanies + 1, companyName: companyName, website: '', official_website: '', emails: '', phones: '', completed: false };
  
//           if (responseObject.PlaywrightResults && responseObject.PlaywrightResults.length > 0) {
//             result.website = responseObject.PlaywrightResults.join(',\n');
//             result.official_website = responseObject.PlaywrightResults[0];
//           } else {
//             console.log('No website found from PlaywrightResults');
//           }
  
//           if (responseObject.ScrapyResults) {
//             const scrapyData = responseObject.ScrapyResults;
  
//             const emailsMatch = scrapyData.match(/final_emails------------\[([^[]+)\]/);
//             if (emailsMatch && emailsMatch.length > 1) {
//               const emailsData = emailsMatch[1];
//               result.emails = emailsData
//                 .match(/'([^']+)'/g)
//                 .map((email: string) => email.replace(/'/g, ''))
//                 .join(',\n');
//               console.log('Final Emails:-----------', result.emails);
//             } else {
//               console.log('No final emails found');
//             }
  
//             const phonesMatch = scrapyData.match(/final_phones------------\[([^[]+)\]/);
//             if (phonesMatch && phonesMatch.length > 1) {
//               const phonesData = phonesMatch[1];
//               result.phones = phonesData
//                 .match(/'([^']+)'/g)
//                 .map((phone: string) => phone.replace(/'/g, ''))
//                 .join(',\n');
//               console.log('Final Phones:----------------', result.phones);
//             } else {
//               console.log('No final phones found');
//             }
//           }
//           result.completed = true;
//           this.companyResults.push(result);
//           this.processedCompanies++;
//           this.processedCompanyNames.add(companyName);
//           this.processCompanyNames(companyNames, flags,  index + 1); 
//         } else {
          
//           this.loading = true;
//           this.errorMessage = 'Website not found';
//           this.companyResults.push({
//             companyNo: this.processedCompanies + 1,
//             companyName: companyName,
//             website: 'Website not found',
//             official_website: '',
//             emails: '',
//             phones: '',
//             completed: true,
//             error: true
//           });
//           this.processedCompanies++;
//           this.processedCompanyNames.add(companyName);
//           this.processCompanyNames(companyNames, flags, index + 1); 
//         }
//       },
//       error => {
//         this.loading = true;
//         this.errorMessage = 'Error searching company ' + companyName;
//         console.error('Error searching company', companyName, ':', error);
  
//         this.companyResults.push({
//           companyNo: this.processedCompanies + 1,
//           companyName: companyName,
//           website: 'Error searching company',
//           official_website: '',
//           emails: '',
//           phones: '',
//           completed: true,
//           error: true
//         });
//         this.processedCompanies++;
//         this.processedCompanyNames.add(companyName);
//         this.processCompanyNames(companyNames, flags, index + 1); 
//       }
//     );
//   }
  
  

}



