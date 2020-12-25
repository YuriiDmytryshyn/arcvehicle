import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { MenuService } from 'src/app/shared/services/menu.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { map } from 'rxjs/operators';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: ICategory[] = [];
  allCategory: Array<ICategory> = [];

  menuActive = 'translate3d(0,0,0)';
  menuStatus = false;

  constructor(
    private menuService: MenuService,
    private categoryService: CategoriesService,
    private prodService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const category = this.activatedRoute.snapshot.paramMap.get('category');
        this.getProductsByCategory(category);
      }
    })
   }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.menuService.menuStatus.subscribe((menuStatus) => {
      this.menuStatus = menuStatus;
      this.isMenuActive(this.menuStatus);
    });
  }

  // onCheckCategory(event): void {
  //   // if (event.target.value) {
  //   //   this.size.push(event.target.value);
  //   // } else if (event.target.checked === false) {
  //   //   const value: any = event.target.value;
  //   //   const index: number = this.size.indexOf(value);
  //   //   this.size.splice(index, 1);
  //   // }
  //   const cat = event.target.value;
  //   this.prodService.getAll().snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c =>
  //         ({ id: c.payload.doc.id, ...c.payload.doc.data() })
  //       )
  //     )
  //   ).subscribe(data => {
  //     this.products = data.map(el => el.category).filter(el => el.name === cat);
  //     console.log(this.products);
  //   });
  // }

  private getCategories(): void {
    this.categoryService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.allCategory = data;
    });
  }

  private getProductsByCategory(category: string): void {
    this.products = []
    this.prodService.getAllCategory(category).onSnapshot(
      snap => {
        snap.forEach(prod => {
          const product = {
            id: prod.id,
            ...prod.data() as IProduct
          };
          this.products.push(product);
        })
      }
    )
  }

  private getProducts(): void {
    this.prodService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.products = data;
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
