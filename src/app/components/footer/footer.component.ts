import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/shared/services/menu.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  menuActive = 'translate3d(0,0,0)';
  menuStatus = false;
  discount: number | string;
  cheackSignIn: boolean;

  email: string;
  password: string;
  phone: string;
  region: string;
  comments: string;

  regExpEmailAddress = /\S\@\S\w+\.[a-zA-z+]/;
  regExpPassword = /^[a-zA-z0-9]{8,15}$/;

  constructor(
    private menuService: MenuService,
    private userAuthServise: UserAuthService,
  ) { }

  ngOnInit(): void {
    this.menuService.menuStatus.subscribe((menuStatus) => {
      this.menuStatus = menuStatus;
      this.isMenuActive(this.menuStatus);
    });
  }

  emailRegExp(): boolean {
    return this.regExpEmailAddress.test(this.email);
  }

  passwordRegExp(): boolean{
    return this.regExpPassword.test(this.password);
  }

  randomDiscount(): void {
    this.discount = Math.ceil(Math.random() * 5);
  }

  signUpUser(): void {
    this.randomDiscount();
    if (this.email && this.password && this.phone && this.region && this.comments && this.discount) {
      this.userAuthServise.signUp(this.email, this.password, this.phone, this.region, this.comments, this.discount);
    }
    this.resetForm();
  }

  private resetForm(): void {
    this.email = '';
    this.password = '';
    this.phone = '';
    this.region = '';
    this.comments = '';
  }

  isMenuActive(status): void {
    if (status === false) {
      this.menuActive = 'translate3d(0,0,0)';
    } else {
      this.menuActive = 'translate3d(-350px,0,0)';
    }
  }

}
