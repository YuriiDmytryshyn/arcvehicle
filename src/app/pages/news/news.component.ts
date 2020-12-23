import { Component, OnInit } from '@angular/core';
import { INews } from 'src/app/shared/interfaces/news.interface';
import { NewsService } from 'src/app/shared/services/news.service';
import { map } from 'rxjs/operators';
import { MenuService } from 'src/app/shared/services/menu.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  news: Array<INews> = [];
  menuActive = 'translate3d(0,0,0)';
  menuStatus = false;

  constructor(
    private menuService: MenuService,
    private newsService: NewsService,
  ) { }

  ngOnInit(): void {
    this.getNews();
    this.menuService.menuStatus.subscribe((menuStatus) => {
      this.menuStatus = menuStatus;
      this.isMenuActive(this.menuStatus);
    });
  }

  getNews(): void {
    this.newsService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.news = data.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
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
