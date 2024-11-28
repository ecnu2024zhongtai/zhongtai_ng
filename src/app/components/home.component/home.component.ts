import { Component } from '@angular/core';
import { GaodeComponent } from '../gaode.component/gaode.component';

@Component({
    selector:'home',
    templateUrl:'./home.component.html',
    styleUrl:'./home.component.css',
    imports: [GaodeComponent],
    standalone:true
})
export class HomeComponent{
    constructor() {}
}


