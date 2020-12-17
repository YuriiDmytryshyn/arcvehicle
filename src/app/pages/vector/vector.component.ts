import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import { MenuService } from 'src/app/shared/services/menu.service';

@Component({
  selector: 'app-vector',
  templateUrl: './vector.component.html',
  styleUrls: ['./vector.component.scss']
})
export class VectorComponent implements OnInit {

  menuActive = 'translate3d(0,0,0)';
  menuStatus = false;
  constructor(
    private menuService: MenuService,
  ) { }

  ngOnInit(): void {
    AOS.init();
    this.menuService.menuStatus.subscribe((menuStatus) => {
      this.menuStatus = menuStatus;
      this.isMenuActive(this.menuStatus);
    });
  }

  isMenuActive(status): void {
    if (status === false) {
      this.menuActive = 'translate3d(0,0,0)';
    } else {
      this.menuActive = 'translate3d(-348px,0,0)';
    }
  }

}
