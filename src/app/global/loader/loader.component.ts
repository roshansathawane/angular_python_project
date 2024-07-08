import { Component, OnInit } from '@angular/core';
//import { AnimationModel, FontModel } from '@syncfusion/ej2-angular-progressbar';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
 
  // public animation: AnimationModel | undefined;
  // public labelStyle: FontModel | undefined;
  public showProgressValue: boolean | undefined;
  ngOnInit(): void {
      // this.animation = { enable: true, duration: 2000, delay: 0 };
      // this.labelStyle = { color: '#FFFFFF' };
      this.showProgressValue = true;
  }

  

}
