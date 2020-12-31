import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { MenuService } from 'src/app/shared/services/menu.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  menuActive = 'translate3d(0,0,0)';
  menuStatus = false;
  uploadPercent: Observable<number>;
  fileUploaded = false;
  dynamic: number = 0;
  currentUser: any = null;
  ImageStatys: boolean = false;

  email: string;
  discount: number | string;
  firstName: string = 'No data';
  lastName: string = 'No data';
  phone: string = 'No data';
  region: string = 'No data';
  city: string = 'No data';
  street: string = 'No data';
  house: string = 'No data';
  comments: string = 'No data';
  orders: Array<IOrder> = [];
  userImage = 'assets/images/user-anonim.jpg';

  constructor(
    private menuService: MenuService,
    private storage: AngularFireStorage,
  ) { }

  ngOnInit(): void {
    this.menuService.menuStatus.subscribe((menuStatus) => {
      this.menuStatus = menuStatus;
      this.isMenuActive(this.menuStatus);
    });
    this.userCredential();
  }

  private userCredential(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.email = this.currentUser.email;
    this.discount = this.currentUser.discount;
    if (this.currentUser.firstName) {
      this.firstName = this.currentUser.firstName;
    }
    if (this.currentUser.lastName) {
      this.lastName = this.currentUser.lastName;
    }
    if (this.currentUser.phone) {
      this.phone = this.currentUser.phone;
    }
    if (this.currentUser.region) {
      this.region = this.currentUser.region;
    }
    if (this.currentUser.city) {
      this.city = this.currentUser.city;
    }
    if (this.currentUser.street) {
      this.street = this.currentUser.street;
    }
    if (this.currentUser.house) {
      this.house = this.currentUser.house;
    }
    if (this.currentUser.comments) {
      this.comments = this.currentUser.comments;
    }
    if (this.currentUser.image) {
      this.userImage = this.currentUser.image;
      this.ImageStatys = true;
    }
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
        this.userImage = url;
        this.ImageStatys = true;
        this.fileUploaded = true;
      });
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
