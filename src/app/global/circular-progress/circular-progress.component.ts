import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circular-progress',
  templateUrl: './circular-progress.component.html',
  styleUrls: ['./circular-progress.component.scss']
})
export class CircularProgressComponent {

  constructor() { }

  @Input() show: boolean = true;



  isLoading = true;
	async wait(ms: number): Promise<void> {
		return new Promise<void>( resolve => setTimeout( resolve, ms) );
	}

	start() {
   
    this.isLoading = true;
		this.wait(3000).then( () => this.isLoading = false );
	}
}
