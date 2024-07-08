import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }
  // setSideBar(message: string) {
  //   let showHide = message;
  //   if (showHide === "true") {
  //     const sidebarClass = document.getElementById('side_scroll_id');
  //     if (sidebarClass) {
  //       sidebarClass.classList.add('mid-panel-left');
  //     }
  //   } else {
  //     const sidebarClass = document.getElementById('side_scroll_id');
  //     if (sidebarClass) {
  //       sidebarClass.classList.remove('mid-panel-left');
  //     }
  //   }
  // }
  setSideBar(message: string) {
    let showHide = message;
    const sidebarClass = document.getElementById('side_scroll_id');
    const breadcrumbClass = document.getElementById('breadcrumb');
    const clickButtonClass = document.getElementById('btn');
  
    if (showHide === "true") {
      if (sidebarClass) {
        sidebarClass.classList.add('mid-panel-left');
      }
      if (breadcrumbClass) {
        breadcrumbClass.classList.remove('breadcrumb-left');
      }
      if (clickButtonClass) {
        clickButtonClass.classList.remove('btn-left');
      }
    } else {
      if (sidebarClass) {
        sidebarClass.classList.remove('mid-panel-left');
      }
      if (breadcrumbClass) {
        breadcrumbClass.classList.add('breadcrumb-left');
        
      }
      if (clickButtonClass) {
        clickButtonClass.classList.add('btn-left');
      }
    }
  }
  



  
  private sidebarState = new BehaviorSubject<boolean>(false);
  sidebarState$ = this.sidebarState.asObservable();

  toggleSidebar(newState: boolean): void {
    this.sidebarState.next(newState);
}
}
