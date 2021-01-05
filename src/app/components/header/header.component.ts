import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { OrderService } from 'src/app/shared/services/order.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { MenuService } from '../../shared/services/menu.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  basket: Array<IProduct> = [];
  length: number;

  statusMenu: false;
  translateMenu = 'translate3d(350px,0,0)';
  menuActive = 'translate3d(0,0,0)';

  StatusSignIn: boolean = false;
  IfNoSign: string = 'block';
  IfSign: string = 'none';
  userEmail: string;
  userPassword: string;


  constructor(
    private menuService: MenuService,
    private userAuthServise: UserAuthService,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.getLocalProducts();
    this.cheackLocalUser();
    this.checkMyBasket();
    this.checkIfUserLogin();
  }

  private checkMyBasket(): void {
    this.orderService.basket.subscribe(
      data => {
        this.basket = data;
        this.length = this.getTotalLength(this.basket);
      }
    )
  };

  private getLocalProducts(): void {
    if (localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket'));
      this.length = this.getTotalLength(this.basket);
    }
  };

  private getTotalLength(products: Array<IProduct>): number {
    return products.reduce((total, prod) => total + prod.count, 0);
  };

  private cheackLocalUser(): void {
    if (localStorage.getItem('user')) {
      this.IfNoSign = 'none';
      this.IfSign = 'block';
      this.StatusSignIn = false;
    } else {
      this.IfNoSign = 'block';
      this.IfSign = 'none';
      this.StatusSignIn = false;
    }
  };

  private checkIfUserLogin(): void {
    this.userAuthServise.cheackSignIn.subscribe(() => {
      this.cheackLocalUser();
    })
  };

  signOutUser(): void {
    this.userAuthServise.signOut();
  };

  singInUser(): void {
    if (this.userEmail && this.userPassword) {
      this.userAuthServise.signIn(this.userEmail, this.userPassword);
    }
  };

  signInMenu(): void {
    this.StatusSignIn = !this.StatusSignIn;
  }

  scrollToLogin(): void {
    document.getElementById('reserve').scrollIntoView({ behavior: "smooth" });
  }

  activeMenu(): void {
    this.translateMenu = 'translate3d(350px,0,0)';
    this.menuActive = 'translate3d(-350px,0,0)';
    this.menuService.statusMenu(true);
  }

  closeMenu(): void {
    this.translateMenu = 'translate3d(350px,0,0)';
    this.menuActive = 'translate3d(0,0,0)';
    this.menuService.statusMenu(false);
  }

}
