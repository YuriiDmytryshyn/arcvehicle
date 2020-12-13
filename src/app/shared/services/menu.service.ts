import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  menuStatus = this.menuSubject.asObservable();

  constructor() { }

  statusMenu = (value: boolean) => {
    this.menuSubject.next(value);
  }
}
