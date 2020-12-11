import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  StatusMenu = false;
  translateMenu = 100;

  constructor() { }

  ngOnInit(): void {
  }

  activeMenu(): void{
    this.StatusMenu = true;
    this.translateMenu = 0;
  }
  closeMenu(): void{
    this.StatusMenu = false;
    this.translateMenu = 100;
  }

}
