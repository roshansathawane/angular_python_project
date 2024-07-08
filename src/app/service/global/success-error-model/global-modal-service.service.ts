import { HttpClient } from '@angular/common/http';
import { Injectable, NgModuleRef } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class GlobalModalService {
 
  private _showProgress: boolean = false;

  get showProgress(): boolean {
    return this._showProgress;
  }

  showProgressIndicator() {
    //alert("show");
    this._showProgress = true;
  }

  hideProgressIndicator() {
    this._showProgress = false;
  }
}
