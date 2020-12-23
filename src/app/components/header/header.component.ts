import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../shared/services/menu.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  statusMenu: false;
  translateMenu = 'translate3d(350px,0,0)';
  menuActive = 'translate3d(0,0,0)';
  overflowY = 'auto';

  constructor(
    private menuService: MenuService,
  ) { }

  ngOnInit(): void {
  }

  activeMenu(): void {
    this.translateMenu = 'translate3d(350px,0,0)';
    this.menuActive = 'translate3d(-348px,0,0)';
    this.overflowY = 'hidden';
    this.menuService.statusMenu(true);
  }

  closeMenu(): void {
    this.translateMenu = 'translate3d(350px,0,0)';
    this.menuActive = 'translate3d(0,0,0)';
    this.overflowY = 'auto';
    this.menuService.statusMenu(false);
  }

}
