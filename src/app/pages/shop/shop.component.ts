import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { MenuService } from 'src/app/shared/services/menu.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: Array<IProduct> = [];

  menuActive = 'translate3d(0,0,0)';
  menuStatus = false;

  constructor(
    private menuService: MenuService,
    private prodService: ProductsService,
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.menuService.menuStatus.subscribe((menuStatus) => {
      this.menuStatus = menuStatus;
      this.isMenuActive(this.menuStatus);
    });
  }

  getProducts(): void {
    this.prodService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.products = data;
    });
  };

  isMenuActive(status): void {
    if (status === false) {
      this.menuActive = 'translate3d(0,0,0)';
    } else {
      this.menuActive = 'translate3d(-348px,0,0)';
    }
  }

}
