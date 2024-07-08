import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from '../../auth/authentication-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  currentPage:any="Data Search Management";
  currentDate:string='';  
  loginName:any;
  constructor(private loginservice: AuthenticationServiceService,private router: Router) {
   

 
   }
  
 

  ngOnInit(): void {
   // this.currentPage=window.sessionStorage.getItem("current_page");
    // this.currentDate = window.sessionStorage.getItem('login_time') ?? '';
    // this.loginName=window.sessionStorage.getItem("loginName");
    // console.log("Login Name Retrieved:", this.loginName);
    
    
   
  }



  // Logout() {
  //   localStorage.removeItem('loginDate');
  //   this.loginservice.logout().subscribe(() => {
  //     console.log('Logout successful');
  //     localStorage.removeItem('token');

  //     let appDeploySide = window.sessionStorage.getItem('appDeploySide');


  //     if (appDeploySide === 'LHS') {
  //       this.router.navigate(['/login']);
  //     } else if (appDeploySide === 'CLIENT') {

  //       this.router.navigate(['/appkey-login']);
  //     } else {
  //       this.router.navigate(['/login']);
  //     }

  //   }, (error: any) => {
  //     console.error('Error during logout', error);
  //   });
  // }



  



}
