import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { INews } from 'src/app/shared/interfaces/news.interface';
import { NewsService } from 'src/app/shared/services/news.service';
import { map } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.scss']
})
export class AdminNewsComponent implements OnInit {

  newsID: number | string;
  date = new Date().toISOString().slice(0, 10);
  newsTitle: string;
  newsText: string;
  newsAuthor: string;
  newsImage = '';

  editStatus = true;
  uploadPercent: Observable<number>;
  upload = false;
  modalRef: BsModalRef;

  adminNews: Array<INews> = [];

  constructor(
    private newsService: NewsService,
    private modalService: BsModalService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.getAdminNews();
  }

  getAdminNews(): void {
    this.newsService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.adminNews = data;
    });
  };

  addAdminNews(): void {
    if (this.newsTitle.length === 0 || this.newsText.length === 0) {
      this.newsTitle = '';
      this.newsText = '';
    } else if (this.newsTitle.length !== 0 || this.newsText.length !== 0 || this.newsAuthor.length !== 0) {
      const NEWS = {
        id: 1,
        title: this.newsTitle,
        text: this.newsText,
        image: this.newsImage,
        date: this.date,
      }
      delete NEWS.id;
      this.newsService.create(NEWS);
      this.resetForm();
    }
  };

  deleteAdminNews(): void {
    this.newsService.delete(this.newsID.toString())
      .then(() => {
        console.log('The product was updated successfully!');
      })
      .catch(err => console.log(err));
  };

  deleteNews(news: INews): void {
    this.newsID = news.id;
  };

  editAdminNews(news: INews): void {
    this.newsID = news.id;
    this.newsTitle = news.title;
    this.newsText = news.text;
    this.editStatus = false;
  };

  saveEditAdminNews(): void {
    const updNews = {
      id: this.newsID,
      title: this.newsTitle,
      text: this.newsText,
      image: this.newsImage,
      date: this.date,
    };
    this.newsService.update(updNews.id.toString(), updNews)
      .then(() => console.log('The news was updated successfully!'))
      .catch(err => console.log(err));
    this.resetForm();
    this.editStatus = true;

  };

  private resetForm(): void {
    this.newsTitle = '';
    this.newsText = '';
  };

  openModalDelete(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  };

  uploadFile(event): void {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    this.uploadPercent = task.percentageChanges();
    this.uploadPercent.subscribe(data => {
      if (data > 0 || data < 100) {
        this.upload = true;
      }
    });
    task.then(image => {
      this.storage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.newsImage = url;
        this.upload = false;
      });
    });
  };

}
