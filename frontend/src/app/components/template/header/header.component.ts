import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product/product.service';
import { NavService } from '../nav/nav.service';
import { HeaderService } from './header.service';

export interface HeaderSettings {
  icon: string
  title: string
  hasStatusIcon: boolean
}

export const HomeHeaderSettings: HeaderSettings = {
  title:"Home",
  icon: "home",
  hasStatusIcon: false
}

export const ProductsHeaderSettings: HeaderSettings = {
  title:"Store",
  icon:"storefront",
  hasStatusIcon: true
}

export const StatusIconOnline = "cloud"
export const StatusIconOffline = "cloud_off"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  headerSettings: HeaderSettings = HomeHeaderSettings;
  statusIcon: string = StatusIconOffline;
  
  constructor(private headerService: HeaderService,
    private productService: ProductService,
    private navService: NavService) {

    //react to changes in the header settings for page location
    this.headerService.getHeaderSettings().subscribe({
      next: (headerSettings: HeaderSettings) => this.headerSettings = headerSettings
    });

    //react to changes in product api status (cloud or local)
    this.productService.getStatus().subscribe({
      next: (isEnabled: boolean) => this.statusIcon = isEnabled ? StatusIconOnline : StatusIconOffline
    });

  }

  ngOnInit(): void {
  }

  toggleNav(): void{
    this.navService.toggle();
  }

}
