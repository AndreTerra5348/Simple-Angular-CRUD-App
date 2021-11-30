import { Component, OnInit } from '@angular/core';
import { ProductsHeaderSettings, StatusIconOffline, StatusIconOnline } from 'src/app/components/template/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productIcon: string = ProductsHeaderSettings.icon;
  statusIconOnline: string = StatusIconOnline;
  statusIconOffline: string = StatusIconOffline;

  constructor() {    
   }

  ngOnInit(): void {
  }

}
