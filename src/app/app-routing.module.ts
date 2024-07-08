import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UploadCompanyListComponent } from './pages/dashboard/upload-company-list/upload-company-list.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { CompanyDetailsDashboardComponent } from './pages/dashboard/company-details-dashboard/company-details-dashboard.component';
import { UploadExcelFileComponent } from './pages/form/upload-excel-file/upload-excel-file.component';
import { SingleFileComponent } from './pages/form/single-file/single-file.component';

const routes: Routes = [
  { path: 'sidebar', component: SidebarComponent },
  { path: '', component: LoginComponent },
  { path: 'uploadCompanyDash', component: UploadCompanyListComponent},
  { path: 'companyDetailDash/:id', component: CompanyDetailsDashboardComponent},
  { path: 'uploadExcelSheet', component: UploadExcelFileComponent },
  { path: 'singleCompanyName', component: SingleFileComponent},
  { path: 'uploadCompanyDash/:token', component: UploadCompanyListComponent }
 
];

@NgModule({


  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
