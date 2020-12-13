import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../shared/services/menu.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  statusMenu: false;
  translateMenu = 'translate3d(383px,0,0)';
  menuActive = 'translate3d(0,0,0)';

  constructor(
    private menuService: MenuService,
  ) { }

  ngOnInit(): void {
  }

  activeMenu(): void {
    this.translateMenu = 'translate3d(383px,0,0)';
    this.menuActive = 'translate3d(-400px,0,0)';
    this.menuService.statusMenu(true);
  }

  closeMenu(): void {
    this.translateMenu = 'translate3d(383px,0,0)';
    this.menuActive = 'translate3d(0,0,0)';
    this.menuService.statusMenu(false);
  }

}
