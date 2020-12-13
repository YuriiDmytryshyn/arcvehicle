import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  StatusMenu = true;
  translateMenu = 'translate3d(100%,0,0)';
  menuActive = 'translate3d(0,0,0)';

  constructor(
  ) { }

  ngOnInit(): void {
  }

  activeMenu(): void {
    this.translateMenu = 'translate3d(100%,0,0)';
    this.menuActive = 'translate3d(-30%,0,0)';
  }

  closeMenu(): void {
    this.translateMenu = 'translate3d(100%,0,0)';
    this.menuActive = 'translate3d(0,0,0)';
  }

}
