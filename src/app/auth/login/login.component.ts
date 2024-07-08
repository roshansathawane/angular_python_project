import { Component, Input } from '@angular/core';


import { Router } from '@angular/router';
import { AuthenticationServiceService } from '../authentication-service.service';
import { response } from 'express';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username :any;
  password : any;
  invalidLogin = false
  apiResponse: any;

  
  @Input() error: string | null="";

  constructor(private router: Router,
    private loginservice: AuthenticationServiceService) { }

  ngOnInit() {
  }



  // checkLogin(): void {
  //   (this.loginservice.authenticate(this.username,this.password).subscribe(
  //     data => {
  //       //this.router.navigate(['/poEntry']);
  //       this.router.navigate(['/uploadCompanyDash']);
  //      this.invalidLogin = false
  //     },
  //     error => {
  //       this.invalidLogin = true
  //       this.error = error.message;

  //     }
  //  )
  //   );

  // }

  checkLogin(): void {
    const login_Credential = {
      username: this.username,
      password: this.password
    };
    this.loginservice.authenticate(login_Credential).subscribe(
      response => {
        this.apiResponse = response;
        if (this.apiResponse.status === 200) {
          if (this.apiResponse.result === 'Success') {
            this.router.navigate(['/uploadCompanyDash']);
            this.invalidLogin = false;
          } else if (this.apiResponse.result === 'Fail') {
            this.error = 'Invalid username or password.';
          }
        }
      },
      error => {
        this.invalidLogin = true;
        this.error = error.message;
      }
    );
  }


 

}


