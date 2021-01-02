import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { map } from 'rxjs/operators';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { Product } from 'src/app/shared/classes/product.model';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  adminCategories: Array<ICategory> = [];
  currentCategory: ICategory;

  modalRef: BsModalRef;
  uploadPercent: Observable<number>;
  addModalHeight = 420;
  fileUploaded = false;
  dynamic: number = 0;
  Status: boolean;
  searchProduct: string;

  adminProducts: Array<IProduct> = [];
  productID: number | string;
  productCategory: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImage: string;
  count: number = 1;
  ifMotorcycle = false;
  ifClothes = false;
  characteristics = [];
  allSize = [
    { description: 's', value: 's' },
    { description: 'm', value: 'm' },
    { description: 'l', value: 'l' },
    { description: 'xl', value: 'xl' },
    { description: 'xxl', value: 'xxl' },
  ];
  size = [];
  gender: string;
  color: string;
  battery: string;
  range: string;
  topSpeed: string;
  weight: string;
  

  constructor(
    private modalService: BsModalService,
    private categoryService: CategoriesService,
    private productService: ProductsService,
    private storage: AngularFireStorage,
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }


  onCheckChange(event): void {
    if (event.target.checked) {
      this.size.push(event.target.value);
    } else if (event.target.checked === false) {
      const value: any = event.target.value;
      const index: number = this.size.indexOf(value);
      this.size.splice(index, 1);
    }
  }

  onCheakGender(event: any): void {
    this.gender = event.target.value;
  }

  private getCategories(): void {
    this.categoryService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.adminCategories = data;
      console.log(this.adminCategories);
    });
  }

  setCategory(): void {
    this.currentCategory = this.adminCategories.filter(category =>
      category.name === this.productCategory)[0];
    console.log(this.currentCategory.name.toLowerCase());
    this.checkCategory();
  }

  checkCategory(): void {
    if (this.currentCategory.name.toLowerCase() === 'motorcycle') {
      this.ifMotorcycle = true;
      this.ifClothes = false;
    } else if (this.currentCategory.name.toLowerCase() === 'costume' || this.currentCategory.name.toLowerCase() === 'helmet') {
      this.ifMotorcycle = false;
      this.ifClothes = true;
    }
  }

  private getProducts(): void {
    this.productService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.adminProducts = data;
    });
  }

  addProduct(): void {
    if (this.currentCategory.name.toLowerCase() === 'motorcycle') {
      this.Status = false;
      this.characteristics = [{
        battery: this.battery,
        range: this.range,
        topSpeed: this.topSpeed,
        weight: this.weight
      }];
      const newProd = new Product(
        1,
        this.currentCategory,
        this.productName,
        this.count,
        this.productDescription,
        this.productPrice,
        this.productImage,
        this.characteristics,
      );
      delete newProd.id;
      this.productService.create(newProd);
      this.characteristics = [];
      this.range = '';
      this.battery = '';
      this.topSpeed = '';
      this.weight = '';
      this.productName = '';
      this.productDescription = '';
      this.productPrice = null;
      this.productCategory = '';
      this.productImage = '';
    } else if (this.currentCategory.name.toLowerCase() === 'costume' || this.currentCategory.name.toLowerCase() === 'helmet') {
      this.Status = false;
      this.characteristics = [{
        gender: this.gender
      }];
      const newProd = new Product(
        1,
        this.currentCategory,
        this.productName,
        this.count,
        this.productDescription,
        this.productPrice,
        this.productImage,
        this.characteristics,
        this.size,
      );
      delete newProd.id;
      this.productService.create(newProd);
      this.characteristics = [];
      this.size = [];
      this.productName = '';
      this.productDescription = '';
      this.productPrice = null;
      this.productCategory = '';
      this.productImage = '';
    }
  }

  selectProduct(prod: IProduct): void {
    this.productID = prod.id;
  }

  deleteProduct(): void {
    this.productService.delete(this.productID.toString())
      .then(() => {
        console.log('The product was updated successfully!');
      })
      .catch(err => console.log(err));
  }

  editProduct(prod: IProduct): void {
    this.Status = true;
    this.currentCategory = prod.category;
    this.productID = prod.id;
    this.productCategory = this.currentCategory.name;
    this.productName = prod.name;
    this.productDescription = prod.description;
    this.productPrice = prod.price;
    this.productImage = prod.image;
  }

  saveProduct(): void {
    const upProduct = {
      id: this.productID,
      category: this.currentCategory,
      name: this.productName,
      description: this.productDescription,
      price: this.productPrice,
      image: this.productImage,
    };
    this.productService.update(upProduct.id.toString(), upProduct)
      .then(() => console.log('The product was updated successfully!'))
      .catch(err => console.log(err));
    this.resetForm();
  }

  uploadFile(event): void {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    this.uploadPercent = task.percentageChanges();
    this.uploadPercent.subscribe(data => {
      if (data === 100) {
        this.dynamic = 100;
      }
    });
    task.then(image => {
      this.storage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.productImage = url;
        this.fileUploaded = true;
      });
    });
  }

  openModalAdd(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
    this.characteristics = [];
    this.size = [];
  }

  openModalDelete(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  private resetForm(): void {
    this.characteristics = [];
    this.size = [];
    this.Status = false;
    this.productName = '';
    this.productDescription = '';
    this.productPrice = null;
    this.productCategory = '';
    this.productImage = '';
    this.fileUploaded = false;
    this.dynamic = 0;
  }

}
