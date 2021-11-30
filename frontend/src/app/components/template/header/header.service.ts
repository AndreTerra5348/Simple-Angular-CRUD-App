import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HeaderSettings, HomeHeaderSettings } from './header.component';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private headerSettingsNotifier = new BehaviorSubject<HeaderSettings>(HomeHeaderSettings)
  constructor() { }

  changeHeaderSettings(headerSettings: HeaderSettings){
    this.headerSettingsNotifier.next(headerSettings);
  }

  getHeaderSettings(): Observable<HeaderSettings>{
    return this.headerSettingsNotifier.asObservable();
  }
}
