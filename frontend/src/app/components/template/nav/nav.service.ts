import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  navState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  getNavState(): Observable<boolean>{
    return this.navState.asObservable();
  }

  changeState(state: boolean): void{
    this.navState.next(state);
  }

  toggle(): void {
    this.navState.next(!this.navState.getValue())    
  }
}
