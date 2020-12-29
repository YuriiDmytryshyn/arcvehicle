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
  currentUser: any = null;

  email: string;
  password: string;
  phone: string;
  region: string;
  comments: string;

  constructor(
    private menuService: MenuService,
    private userAuthServise: UserAuthService,
  ) { }

  ngOnInit(): void {
    this.menuService.menuStatus.subscribe((menuStatus) => {
      this.menuStatus = menuStatus;
      this.isMenuActive(this.menuStatus);
    });
    this.checkIfUserLogin();
  }

  private checkIfUserLogin(): void {
    this.userAuthServise.cheackSignIn.subscribe(() => {
      this.updateLocalUser();
    })
  };

  private updateLocalUser(): void {
    if (this.phone && this.region) {
      if (localStorage.getItem('user')) {
        let user = JSON.parse(localStorage.getItem('user'));
        const data = {
          phone: this.phone,
          region: this.region,
        };
        this.userAuthServise.updateUserData(user.id, data).then(
          () => {
            this.updateLocal(data)
          }
        )
      }
    }
  };

  private updateLocal(data): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    const local = {
      ...this.currentUser,
      ...data
    };
    localStorage.setItem('user', JSON.stringify(local))
  }

  signUpUser(): void {
    if (this.email && this.password) {
      this.userAuthServise.signUp(this.email, this.password);
    }
  }

  isMenuActive(status): void {
    if (status === false) {
      this.menuActive = 'translate3d(0,0,0)';
    } else {
      this.menuActive = 'translate3d(-350px,0,0)';
    }
  }

}
