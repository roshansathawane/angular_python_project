import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription, timer } from 'rxjs';
import { ExcelSheetServiceService } from '../../../service/excel-sheet-service.service';

import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { SuccessErrorModalService } from '../../../service/global/global-modal/success-error-modal.service';
import { response } from 'express';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-excel-file',
  templateUrl: './upload-excel-file.component.html',
  styleUrl: './upload-excel-file.component.scss'
})
export class UploadExcelFileComponent {

  setSideBar($event: string) {
  throw new Error('Method not implemented.');
  }

  excelForm:FormGroup;
  fileToUpload: File | undefined ;
  apiResponse: any;
  updateInterval: any;
  updateSubscription: Subscription | undefined;
  emailCheckboxChecked: boolean = false;
  errorMessage: any;

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
  loading: boolean = false;
  processCompleted: boolean = false;
  token : number= 0;
  loading1 = false;
  originalFile : any;
  processedCompanyNames: Set<string> = new Set<string>();
  remainingCompanyNames: string[] = [];
  processTerminatedUnexpectedly: boolean = false;
  total_count: any;
  processing: boolean = false;

  showSuggestionBox: boolean = false;
  select_official_details: boolean= false;
  select_zauba_details: boolean= false;
  selectedDetails: string[] = [];
  error : boolean = true;


 
  constructor(private formBuilder: FormBuilder , private excelSheetService:ExcelSheetServiceService, private success_error_Modal: SuccessErrorModalService, private router: Router) {
    this.excelForm  = this.formBuilder.group({
      inputField: [null]
    });
  }


  handleFileInput(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.fileToUpload = files.item(0);
    }
  }


  // redirectToDashboard(token: number) {
  //   this.router.navigate(['/uploadCompanyDash', token ]);
  // }

 
  uploadCompanyNames(): void {
    this.loading = true
    this.processedCompanies = 0;
    this.companyResults = []; 
    // this.uploadFile();
    if (!this.fileToUpload) {
      this.success_error_Modal.openErrorModal('Please select correct file.')
      this.loading = false
    } else {
      this.uploadFile();
    }
    
  }



  uploadFile(): void{
    if(this.fileToUpload){
      const formData = new FormData();
      formData.append('fileInput', this.fileToUpload);

      this.excelSheetService.uploadExcelSheet(formData).subscribe(
        response =>{
          this.apiResponse = response  
          this.token = this.apiResponse.result; 

          
          if(this.apiResponse && this.apiResponse.status === 200){
            // this.redirectToDashboard(this.token); 
            // this.send_TokenNo(this.token)
            this.loading = false
            if(this.apiResponse && this.apiResponse.status === 200){
              this.success_error_Modal.openSuccessModal('File Upload Successfully.' + '\n ' +  "Token: " + this.token + '\n '+ 'Do You want to process start?', () => this.showSuggestionBox= true) ;
             
          
              // this.success_error_Modal.openSuccessModal("Token: " + this.token + ' \n' + "Process Start?", () => this.send_TokenNo(this.token));           
            }else{
              console.log('Website not found')
              this.loading = false
            }
          }else{
            console.log('Website not found')
            this.loading = false
          }
        },
        error =>{
          this.errorMessage = 'Website not found'
          this.success_error_Modal.openErrorModal('error')
          this.loading = false
        }
      );
    }
    }



    onZaubaDetailsChange() {
      if (this.select_zauba_details === true) {
        this.error = false
        this.openZaubaModal();

      }else if (this.select_zauba_details === false){
        this.error = false
        this.closeZaubaModal();  
      } else if (this.select_zauba_details === false && this.select_zauba_details === false ){
        this.error = true
      }
    }


   


    openZaubaModal() {
      const modalElement = document.getElementById('suggestionModal');
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
      const modalElement = document.getElementById('suggestionModal');
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






  // send_TokenNo(token: number): void {
    send_TokenNo(): void {

    this.selectedDetails=[];
    if(this.select_official_details === true){
      this.selectedDetails.push('official_details');
    }
    if(this.select_zauba_details === true){
      this.selectedDetails.push('zauba_details');
    }
    if(this.select_official_details === false  && this.select_zauba_details === false ){
      // this.success_error_Modal.openErrorModal('Please select any details')
      this.error = true
      return
    }
   

    this.showSuggestionBox= false;
    this.loading = true;
    this.processing = true;
      this.excelSheetService.getExcelSheetData(this.token).subscribe(
        response => {
          this.apiResponse = response;
          this.total_count= +this.apiResponse.count
          console.log('this.total_count------------'+this.total_count)
          console.log('this.apiResponse------------'+JSON.stringify(this.apiResponse))
          if (this.apiResponse && this.apiResponse.status === 200) {
            const companyNames = this.apiResponse.company_names;
            const flags  = this.apiResponse.flag;
            this.processCompanyNames(companyNames, flags ,  0);
          } else {
            console.log("Token not found")
          }
        },
        error => {
          this.processing = false;
          this.errorMessage = error;
        }
      );
    }




// ---------------------------------------------------------------********************----------------------------




 

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
  

  //   this.excelSheetService.searchexcelFile({ companyName, token: this.token}).subscribe(
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



  private processCompanyNames(companyNames: string[], flags:string[], index: number = 0) {
    if (index >= companyNames.length) {
      this.loading = false;
      this.processCompleted = true;
      this.success_error_Modal.openSuccessModal('Process completed', () => {
        this.companyResults = [];
      });

      return;
    }

  
  const companyName = companyNames[index];
  const flag = flags[index];
  if (flag === 'P') {
        console.log(`${companyName} is marked with flag 'P', skipping...`);
        this.processCompanyNames(companyNames, flags, index + 1);
        return;
      }

    if (this.processedCompanyNames.has(companyName)) {
      this.success_error_Modal.openSuccessModal(
        `${companyName} has already been processed.`,
        () => this.processCompanyNames(companyNames, flags,  index + 1) 
      );
      return;
    }  
    this.excelSheetService.searchexcelFile({ companyName, token: this.token, selectedDetails: this.selectedDetails}).subscribe(
      response => {
       
        const responseObject = response;   
        if (responseObject && responseObject.status === 200) {
          const zaub_website = JSON.stringify(responseObject.zaub_website)
          const zaub_email = JSON.stringify(responseObject.zaub_email)
          const zaub_address = JSON.stringify(responseObject.zaub_address)
          const zaub_director_details = JSON.stringify(responseObject.zaub_director_details)

          console.log(`Processing company: ${companyNames[index]}`);
          const result: any = { companyNo: this.processedCompanies + 1, companyName: companyName, website: '', official_website: '', emails: '', phones: '', completed: false, zaub_website: zaub_website, zaub_email: zaub_email, zaub_address: zaub_address, zaub_director_details: zaub_director_details, total_count: this.total_count   };
  
          if (responseObject.PlaywrightResults && responseObject.PlaywrightResults.length > 0) {
            result.website = responseObject.PlaywrightResults.join(',\n');
            result.official_website = responseObject.PlaywrightResults[0];
          } else {
            console.log('No website found from PlaywrightResults');
          }
  
          if (responseObject.ScrapyResults) {
            const scrapyData = responseObject.ScrapyResults;
  
            const emailsMatch = scrapyData.match(/final_emails------------\[([^[]+)\]/);
            if (emailsMatch && emailsMatch.length > 1) {
              const emailsData = emailsMatch[1];
              result.emails = emailsData
                .match(/'([^']+)'/g)
                .map((email: string) => email.replace(/'/g, ''))
                .join(',\n');
              console.log('Final Emails:-----------', result.emails);
            } else {
              console.log('No final emails found');
            }
  
            const phonesMatch = scrapyData.match(/final_phones------------\[([^[]+)\]/);
            if (phonesMatch && phonesMatch.length > 1) {
              const phonesData = phonesMatch[1];
              result.phones = phonesData
                .match(/'([^']+)'/g)
                .map((phone: string) => phone.replace(/'/g, ''))
                .join(',\n');
              console.log('Final Phones:----------------', result.phones);
            } else {
              console.log('No final phones found');
            }
          }
          result.completed = true;
          this.companyResults.push(result);
          this.processedCompanies++;
          this.processedCompanyNames.add(companyName);
          this.processCompanyNames(companyNames, flags,  index + 1); 
        } else {
          
          this.loading = true;
          this.errorMessage = 'Website not found';
          this.companyResults.push({
            companyNo: this.processedCompanies + 1,
            companyName: companyName,
            website: 'Website not found',
            official_website: '',
            emails: '',
            phones: '',
            completed: true,
            error: true,
            zaub_website: '',
            zaub_email: '',
            zaub_address: '', 
            zaub_director_details: '',
            total_count: this.total_count,
          });
          this.processedCompanies++;
          this.processedCompanyNames.add(companyName);
          this.processCompanyNames(companyNames, flags,  index + 1); 
        }
      },
      error => {
        this.loading = true;
        this.errorMessage = 'Website not found' + companyName;
        console.error('Website not found', companyName, ':', error);

        this.companyResults.push({
          companyNo: this.processedCompanies + 1,
          companyName: companyName,
          website: 'Website not found',
          official_website: '',
          emails: '',
          phones: '',
          completed: true,
          error: true,
          zaub_website: '',
          zaub_email: '',
          zaub_address: '', 
          zaub_director_details: '',
          total_count: this.total_count,
        });
        this.processedCompanies++;
        this.processedCompanyNames.add(companyName);
        this.processCompanyNames(companyNames, flags, index + 1); 
      }
    );
  }








  


  copyCompanyDetails(): void {
    if (this.companyResults.length === 0) {
      console.error('No company details to copy.');
      return;
    }
  
    // const companyIndex = this.processedCompanies - 1; 
    // const companyName = this.companyResults[companyIndex]?.companyName;
    // const website = this.companyResults[companyIndex]?.website;
    // const emails = this.companyResults[companyIndex]?.emails;
    // const phones = this.companyResults[companyIndex]?.phones; 
    // const detailsToCopy = `Company Name: ${companyName}\nWebsite: ${website}\nEmail: ${emails}\nPhone Number: ${phones}`;

    let detailsToCopy = '';
    this.companyResults.forEach((result, index) => {
      detailsToCopy += `Company ${index + 1} Details:\n`;
      detailsToCopy += `Company Name: ${result.companyName}\n`;
      detailsToCopy += `Website: ${result.website}\n`;
      detailsToCopy += `Email: ${result.emails}\n`;
      detailsToCopy += `Phone Number: ${result.phones}\n\n`;
    });
  
  
    const textarea = document.createElement('textarea');
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '0';
    textarea.style.width = '2em';
    textarea.style.height = '2em';
    textarea.style.padding = '0';
    textarea.style.border = 'none';
    textarea.style.outline = 'none';
    textarea.style.boxShadow = 'none';
    textarea.style.background = 'transparent';
    textarea.value = detailsToCopy;
  
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    console.log('Company details copied successfully.');
  }


  

}
