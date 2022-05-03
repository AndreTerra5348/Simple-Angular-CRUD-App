import { Component, OnInit } from '@angular/core';
import { NavService } from '../nav/nav.service';
import { HeaderService } from './header.service';

export interface HeaderSettings {
  icon: string
  title: string
  hasStatusIcon: boolean
}

export const HomeHeaderSettings: HeaderSettings = {
  title: "Home",
  icon: "home",
  hasStatusIcon: false
}

export const ProductsHeaderSettings: HeaderSettings = {
  title: "Store",
  icon: "storefront",
  hasStatusIcon: true
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  headerSettings: HeaderSettings = HomeHeaderSettings;

  constructor(private headerService: HeaderService,
    private navService: NavService) {

    //react to changes in the header settings for page location
    this.headerService.getHeaderSettings().subscribe({
      next: (headerSettings: HeaderSettings) => this.headerSettings = headerSettings
    });

  }

  ngOnInit(): void {
  }

  toggleNav(): void {
    this.navService.toggle();
  }

}
