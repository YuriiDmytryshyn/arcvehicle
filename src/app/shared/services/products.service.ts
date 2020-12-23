import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private dbPath = '/products';
  productRef: AngularFirestoreCollection<IProduct> = null;

  constructor(
    private db: AngularFirestore
  ) {
    this.productRef = this.db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<IProduct> {
    return this.productRef;
  }

  getAllCategory(categoryName: string): any {
    return this.productRef.ref.where('category.name', '==', categoryName);
  }

  create(category: IProduct): any {
    return this.productRef.add({ ...category });
  }

  update(id: string, data: any): Promise<void> {
    return this.productRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.productRef.doc(id).delete();
  }

  getSingleProduct(id: string): any {
    return this.productRef.doc(id).get();
  }
}
