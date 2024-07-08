

import { Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';

import { UploadCompanyListComponent } from './pages/dashboard/upload-company-list/upload-company-list.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CompanyDetailsDashboardComponent } from './pages/dashboard/company-details-dashboard/company-details-dashboard.component';
import { UploadExcelFileComponent } from './pages/form/upload-excel-file/upload-excel-file.component';

import { SingleFileComponent } from './pages/form/single-file/single-file.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UploadCompanyListComponent, 
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    CompanyDetailsDashboardComponent,
    UploadExcelFileComponent,
    SingleFileComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule, MatDialogModule, MatProgressSpinnerModule
    
    

  ],
  providers: [

  
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}

