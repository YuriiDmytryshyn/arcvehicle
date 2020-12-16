import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { INews } from '../interfaces/news.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private dbPath = '/news';
  newsRef: AngularFirestoreCollection<INews> = null;

  constructor(
    private db: AngularFirestore
  ) { this.newsRef = this.db.collection(this.dbPath); }

  getAll(): AngularFirestoreCollection<INews> {
    return this.newsRef;
  }

  create(news: INews): any {
    return this.newsRef.add({ ...news });
  }

  update(id: string, data: any): Promise<void> {
    return this.newsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.newsRef.doc(id).delete();
  }
}
