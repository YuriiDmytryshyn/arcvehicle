import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import { NewsService } from 'src/app/shared/services/news.service';
import { MenuService } from '../../shared/services/menu.service';
import { map } from 'rxjs/operators';
import { INews } from 'src/app/shared/interfaces/news.interface';
import { AUTO_STYLE } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  menuActive = 'translate3d(0,0,0)';
  menuStatus = false;
  news: Array<INews> = [];
  overflowY = 'auto';


  constructor(
    private menuService: MenuService,
    private newsService: NewsService,
  ) { }

  ngOnInit(): void {
    this.getNews();
    AOS.init();
    this.menuService.menuStatus.subscribe((menuStatus) => {
      this.menuStatus = menuStatus;
      this.isMenuActive(this.menuStatus);
    });
  }

  scrollToLogin(): void{
    document.getElementById('reserve').scrollIntoView({ behavior: "smooth" });
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
      this.menuActive = 'translate3d(-349px,0,0)';
    }
  }

}
