import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dataSearchWeb';

  constructor(private router: Router) {}

  redirectTo(path: string) {
    this.router.navigate([`/${path}`]);
  }
}

