import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductsService } from 'src/app/shared/services/products.service';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { MenuService } from 'src/app/shared/services/menu.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;
  menuActive = 'translate3d(0,0,0)';
  menuStatus = false;

  constructor(
    private menuService: MenuService,
    private activatedRoute: ActivatedRoute,
    private prodService: ProductsService,
    public location: Location
  ) { }

  ngOnInit(): void {
    this.getProd();
    this.menuService.menuStatus.subscribe((menuStatus) => {
      this.menuStatus = menuStatus;
      this.isMenuActive(this.menuStatus);
    });
  }

  private getProd(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.prodService.getSingleProduct(id).subscribe(
      data => {
        this.product = data.data();
      })
  };

  isMenuActive(status): void {
    if (status === false) {
      this.menuActive = 'translate3d(0,0,0)';
    } else {
      this.menuActive = 'translate3d(-349px,0,0)';
    }
  }

}
