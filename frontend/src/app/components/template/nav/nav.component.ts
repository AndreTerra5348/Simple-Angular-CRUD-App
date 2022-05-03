import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { HeaderSettings, HomeHeaderSettings, ProductsHeaderSettings } from '../header/header.component';
import { HeaderService } from '../header/header.service';
import { NavService } from './nav.service';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  opened: boolean = false;
  homeIcon: string = HomeHeaderSettings.icon;
  productIcon: string = ProductsHeaderSettings.icon;


  private routeEventSubscription
  constructor(private router: Router,
    private headerService: HeaderService,
    private navService: NavService) {
    this.routeEventSubscription = router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(event => event as NavigationEnd)
      ).subscribe(event => {
        const isHome = !event.url.includes("/products")
        const headerSettings: HeaderSettings = isHome ? HomeHeaderSettings : ProductsHeaderSettings;
        this.headerService.changeHeaderSettings(headerSettings);
      });

    navService.getNavState().subscribe(state => {
      this.opened = state;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.routeEventSubscription.unsubscribe()
  }

  toggle(): void {
    this.navService.toggle();
  }
}
