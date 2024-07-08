import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExcelSheetServiceService } from '../../../service/excel-sheet-service.service';
import { response } from 'express';
import { error } from 'console';
import { SuccessErrorModalService } from '../../../service/global/global-modal/success-error-modal.service';

@Component({
  selector: 'app-single-file',
  templateUrl: './single-file.component.html',
  styleUrl: './single-file.component.scss'
})
export class SingleFileComponent {
  zaub_website: string ='';
  zaub_email: string = '';
  zaub_address: string = '';
  zaub_director_details: string = '';

  setSideBar($event: string) {
    throw new Error('Method not implemented.');
    }

  singleForm:FormGroup;
  companyResults: any[] = [];
  loading: boolean = false;
  processCompleted: boolean = false;
  errorMessage: string = '';
  token : number= 0;
  loading1 = false;
  apiResponse: any;
  token_no : any;
 

  constructor(private formBuilder: FormBuilder, private excelSheetService:ExcelSheetServiceService, private success_error_Modal: SuccessErrorModalService,  ){
    this.singleForm = this.formBuilder.group({
      companyName: ['', Validators.required]
    });
  }




  searchCompanyName(): void {
    this.loading = true;
    this.loading1 = true;
    this.processCompleted = false;
    this.companyResults = [];

    const companyNamesInput = this.singleForm.get('companyName')?.value;
    const companyNames = companyNamesInput.split(',').map((name: string) => name.trim());
    this.processCompanyNames(companyNames);
  }

  // private processCompanyNames(names: string[], token: number): void {
    private processCompanyNames(names: string[]): void {
    if (names.length === 0) {
      this.loading = false;
      this.processCompleted = true;
      return;
    }

    const companyName = names.shift()!;
    this.excelSheetService.searchCompanyName({companyName}).subscribe(
      response => {
        this.loading1 = false;
        const responseObject = JSON.parse(JSON.stringify(response));
        const zaub_website = JSON.stringify(responseObject.zaub_website)
        const zaub_email = JSON.stringify(responseObject.zaub_email)
        const zaub_address = JSON.stringify(responseObject.zaub_address)
        const zaub_director_details = JSON.stringify(responseObject.zaub_director_details)

        this.zaub_website = JSON.stringify(responseObject.zaub_website)
        this.zaub_email = JSON.stringify(responseObject.zaub_email)
        this.zaub_address = JSON.stringify(responseObject.zaub_address)
        this.zaub_director_details = JSON.stringify(responseObject.zaub_director_details)

        const result: any = {
          companyName,
          website: '',
          officialWebsite: '',
          emails: '',
          phones: '',
          zaub_website: zaub_website, zaub_email: zaub_email, zaub_address: zaub_address, zaub_director_details: zaub_director_details,
        };

        if (responseObject.PlaywrightResults && responseObject.PlaywrightResults.length > 0) {
          result.website = responseObject.PlaywrightResults.join(',\n');
          result.officialWebsite = responseObject.PlaywrightResults[0];
        }

        if (responseObject.ScrapyResults) {
          const scrapyData = responseObject.ScrapyResults;

          const emailsMatch = scrapyData.match(/final_emails------------\[([^[]+)\]/);
          if (emailsMatch && emailsMatch.length > 1) {
            const emailsData = emailsMatch[1];
            result.emails = emailsData.match(/'([^']+)'/g).map((email: string) => email.replace(/'/g, '')).join(',\n');
          }

          const phonesMatch = scrapyData.match(/final_phones------------\[([^[]+)\]/);
          if (phonesMatch && phonesMatch.length > 1) {
            const phonesData = phonesMatch[1];
            result.phones = phonesData.match(/'([^']+)'/g).map((phone: string) => phone.replace(/'/g, '')).join(',\n');
          }
        }

        this.companyResults.push(result);
        this.processCompanyNames(names);
      },
      error => {
        this.loading1 = false;
        
        this.errorMessage = `Error searching company ${companyName}`;
        console.error('Error searching company', companyName, ':', error);
        this.processCompanyNames(names);
        this.companyResults.push({
          companyName: companyName,
          website: 'Website not found',
          official_website: '',
          emails: '',
          phones: '',
          error: true,
          
        }) 
      }
    );
  }

   private generateToken(): number {
    return Math.floor(Math.random() * 90000) + 10000; 
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
      detailsToCopy += `Phone Number: ${result.phones}\n`;
      detailsToCopy += `Zauba Website: ${result.zaub_website}\n`;
      detailsToCopy += `Zauba Email: ${result.zaub_email}\n`;
      detailsToCopy += `Zauba Address: ${result.zaub_address}\n`;
      detailsToCopy += `Zauba Director Details: ${result.zaub_director_details}\n`;
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
    this.success_error_Modal.openSuccessModal('Company details copied successfully.')
  }
  

  // save(): void {
  //   // this.token = this.generateToken();


  //   let detailsToSave = '';
  //   this.companyResults.forEach((result, index) => {
  //     detailsToSave += `Company ${index + 1} Details:\n`;
  //     detailsToSave += `Company Name: ${result.companyName}\n`;
  //     detailsToSave += `Website: ${result.website}\n`;
  //     detailsToSave += `Email: ${result.emails}\n`;
  //     detailsToSave += `Phone Number: ${result.phones}\n\n`;
  //   });

  //   const companyData = {
  //     detailsToSave,
  //     token: this.token
  //   };

  //   this.excelSheetService.saveCompanyData(companyData).subscribe(
  //     (response: any) => {
  //       this.apiResponse = response;

  //       console.log('this.apiResponse---token-------' + this.apiResponse.result);
  //       this.token_no=  this.apiResponse.result
  //     },
  //     (error: any) => {
  //       this.errorMessage = error;
  //       console.error('Error saving company data:', error);
  //     }
  //   );
  // }

  
  save(): void {
    let detailsToSave = '';
    this.companyResults.forEach((result, index) => {
        detailsToSave += `Company ${index + 1} Details:\n`;
        detailsToSave += `Company Name: ${result.companyName}\n`;
        detailsToSave += `Website: ${result.website}\n`;
        detailsToSave += `Email: ${result.emails}\n`;
        detailsToSave += `Phone Number: ${result.phones}\n\n`;
    });

    
    const zaub_website =  this.zaub_website;
    const zaub_email = this.zaub_email;
    const zaub_address =this.zaub_address;
    const zaub_director_details= this.zaub_director_details;
   

    this.excelSheetService.saveCompanyData({ detailsToSave, zaub_website, zaub_email, zaub_address, zaub_director_details }).subscribe(
        (response: any) => {
            this.apiResponse = response;
            if(this.apiResponse.status === 200){
            console.log('this.apiResponse---token-------' + this.apiResponse.result);
            this.token_no = this.apiResponse.result;
            this.success_error_Modal.openSuccessModal('Company details save successfully.')
            } else{
              this.success_error_Modal.openErrorModal('Some thing  went wrong')
            }
        },
        (error: any) => {
            this.errorMessage = error;
            console.error('Error saving company data:', error);
            this.success_error_Modal.openErrorModal('Some thing  went wrong')
        }
    );
}

  


download_excel(): void {
  const token = this.token_no
  this.excelSheetService.download_excelsSheetData(token).subscribe(
    (response: Blob) => {
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
      this.errorMessage = error.message;
      console.log("Token not found");
      this.success_error_Modal.openErrorModal('Some thing went Wrong')
    }
  );
}
}
