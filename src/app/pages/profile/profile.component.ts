import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { MenuService } from 'src/app/shared/services/menu.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

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
  UpdateStatus: boolean = false;
  ReadonlyStatus: boolean = true;
  SaveStatus: boolean = false;


  currentUser: any = null;
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
    private userAuthServise: UserAuthService,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.menuService.menuStatus.subscribe((menuStatus) => {
      this.menuStatus = menuStatus;
      this.isMenuActive(this.menuStatus);
    });
    this.userCredential();
  }

  SaveContentProfile(): void {
    if (localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'));
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phone,
        region: this.region,
        city: this.city,
        street: this.street,
        house: this.house,
        image: this.userImage
      };
      this.userAuthServise.updateUserData(user.id, data).then(
        () => {
          this.updateLocal(data)
        }
      )
    }
    this.UpdateStatus = false;
    this.ReadonlyStatus = true;
    this.SaveStatus = false;
  }

  private updateLocal(data): void {
    const local = {
      ...this.currentUser,
      ...data
    };
    localStorage.setItem('user', JSON.stringify(local))
  }

  UpdateContentProfile(): void {
    this.UpdateStatus = true;
    this.ReadonlyStatus = false;
    this.SaveStatus = true;
  }

  private userCredential(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.orders = this.currentUser.orders;
    console.log(this.orders);
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
        this.fileUploaded = true;
      });
    });
  }

  isMenuActive(status): void {
    if (status === false) {
      this.menuActive = 'translate3d(0,0,0)';
    } else {
      this.menuActive = 'translate3d(-349px,0,0)';
    }
  }

}
