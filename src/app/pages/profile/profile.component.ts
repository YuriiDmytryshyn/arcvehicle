import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  modalRef: BsModalRef;
  uploadPercent: Observable<number>;
  fileUploaded = false;
  dynamic: number = 0;
  Status = false;

  email: string;
  discount: number | string;
  firstName: string = 'Your';
  lastName: string;
  image: string;
  phone: string;
  region: string;
  city: string;
  street: string;
  house: string;
  comments: string;
  orders: Array<IOrder> = [];
  userImage = 'assets/images/user-anonim.jpg';

  constructor(
    private menuService: MenuService,
    private modalService: BsModalService,
    private storage: AngularFireStorage,
  ) { }

  ngOnInit(): void {
    this.menuService.menuStatus.subscribe((menuStatus) => {
      this.menuStatus = menuStatus;
      this.isMenuActive(this.menuStatus);
    });
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
        this.Status = true;
        this.userImage = url;
        this.fileUploaded = true;
      });
    });
  };

  openModalAdd(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  };

  isMenuActive(status): void {
    if (status === false) {
      this.menuActive = 'translate3d(0,0,0)';
    } else {
      this.menuActive = 'translate3d(-350px,0,0)';
    }
  }

}
