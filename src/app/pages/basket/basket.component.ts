import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { MenuService } from 'src/app/shared/services/menu.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  menuActive = 'translate3d(0,0,0)';
  menuStatus = false;

  basket: Array<IProduct> = [];
  modalRef: BsModalRef;
  cheackSignIn: boolean;
  IfShow = true;
  totalPrice = 0;
  productIndex: number = null;

  currentUser: any = null;
  discount: any = null;
  firstName: string;
  lastName: string;
  phone: string;
  region: string;
  city: string;
  street: string;
  house: string;
  

  constructor(
    private menuService: MenuService,
    private userAuthServise: UserAuthService,
    private orderService: OrderService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.getLocalProducts();
    this.menuService.menuStatus.subscribe((menuStatus) => {
      this.menuStatus = menuStatus;
      this.isMenuActive(this.menuStatus);
    });
    this.userAuthServise.cheackSignInStatus.subscribe((menuStatus) => {
      this.cheackSignIn = menuStatus;
      this.checkIfUserLogin(this.cheackSignIn);
    });
  }

  private userCredential(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.discount = this.currentUser.discount;
    this.firstName = this.currentUser.firstName;
    this.lastName = this.currentUser.lastName;
    this.phone = this.currentUser.phone;
    this.region = this.currentUser.region;
    this.city = this.currentUser.city;
    this.street = this.currentUser.street;
    this.house = this.currentUser.house;
  }

  indexProduct(product: IProduct): void{
    this.productIndex = this.basket.findIndex(prod => prod.id === product.id);
  }

  deleteProduct(): void{
    this.basket.splice(this.productIndex, 1);
    this.productIndex = null;
    this.totalPrice = this.getTotal(this.basket);
    this.orderService.basket.next(this.basket);
    localStorage.setItem('basket', JSON.stringify(this.basket));
  }

  private checkIfUserLogin(status): void {
    if (!status) {
      this.IfShow = true;
      this.IfShow = true;
      this.discount = null;
      this.firstName = '';
      this.lastName = '';
      this.phone = '';
      this.region = '';
      this.city = '';
      this.street = '';
      this.house = '';
    } else {
      this.IfShow = false;
      this.currentUser = JSON.parse(localStorage.getItem('user'));
      this.discount = this.currentUser.discount;
      this.firstName = this.currentUser.firstName;
      this.lastName = this.currentUser.lastName;
      this.phone = this.currentUser.phone;
      this.region = this.currentUser.region;
      this.city = this.currentUser.city;
      this.street = this.currentUser.street;
      this.house = this.currentUser.house;
    }
  };

  prodCount(prod: IProduct, status: boolean): void {
    if (status) {
      prod.count++;
    } else {
      if (prod.count > 1) {
        prod.count--;
      }
    }
    this.totalPrice = this.getTotal(this.basket);
    this.orderService.basket.next(this.basket);
    localStorage.setItem('basket', JSON.stringify(this.basket));
  };

  private getLocalProducts(): void {
    if (localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket'));
      this.totalPrice = this.getTotal(this.basket);
    }
  };

  private getTotal(products: Array<IProduct>): number {
    return products.reduce((total, prod) => total + (prod.price * prod.count), 0);
  };

  isMenuActive(status): void {
    if (status === false) {
      this.menuActive = 'translate3d(0,0,0)';
    } else {
      this.menuActive = 'translate3d(-349px,0,0)';
    }
  }

  closeModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  };

}
