import { Component, OnInit } from '@angular/core';
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
  cat: string = '';
  gender: string = '';
  discount: number | string;
  ifLogin: boolean = false;

  constructor(
    private menuService: MenuService,
    private categoryService: CategoriesService,
    private prodService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.updateLocalUser();
    this.menuService.menuStatus.subscribe((menuStatus) => {
      this.menuStatus = menuStatus;
      this.isMenuActive(this.menuStatus);
    });
  }

  private updateLocalUser(): void {
    if (localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'));
      this.discount = user.discount;
      this.ifLogin = true;
    }
  };

  onCheckCategory(event): void {
    this.cat = event.target.value;
    console.log(this.cat);
    this.prodService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      if (this.gender.length === 0 && this.cat.length !== 0) {
        this.products = data.filter(el => el.category.name === this.cat);
      }
      this.cat = '';
    });
  }

  onCheckGender(event): void {
    this.gender = event.target.value;
    console.log(this.gender);
    this.prodService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      if (this.cat.length === 0 && this.gender.length !== 0) {
        this.products = data.filter(el => el.characteristics[0].gender === this.gender);
      }
      this.gender = '';
    });
  }

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
  }

  isMenuActive(status): void {
    if (status === false) {
      this.menuActive = 'translate3d(0,0,0)';
    } else {
      this.menuActive = 'translate3d(-350px,0,0)';
    }
  }

}
