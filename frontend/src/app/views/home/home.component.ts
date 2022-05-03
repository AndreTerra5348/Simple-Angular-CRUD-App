import { Component, OnInit } from '@angular/core';
import { ProductsHeaderSettings } from 'src/app/components/template/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productIcon: string = ProductsHeaderSettings.icon;

  constructor() {
  }

  ngOnInit(): void {
  }

}
