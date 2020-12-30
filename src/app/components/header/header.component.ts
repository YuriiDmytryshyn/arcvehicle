import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { MenuService } from '../../shared/services/menu.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  statusMenu: false;
  translateMenu = 'translate3d(350px,0,0)';
  menuActive = 'translate3d(0,0,0)';


  StatusSignIn: boolean = false;
  cheackSignIn: boolean;
  IfNoSign: string = 'block';
  IfSign: string = 'none';
  userEmail: string;
  userPassword: string;


  constructor(
    private menuService: MenuService,
    private userAuthServise: UserAuthService,
  ) { }

  ngOnInit(): void {
    this.userAuthServise.cheackSignInStatus.subscribe((menuStatus) => {
      this.cheackSignIn = menuStatus;
      this.checkIfUserLogin(this.cheackSignIn);
    });
    this.cheackLocalUser();
  }

  private cheackLocalUser(): void {
    if (localStorage.getItem('user')) { 
      this.IfNoSign = 'none';
      this.IfSign = 'block';
      this.StatusSignIn = false;
    }
  };

  private checkIfUserLogin(status): void {
    if (!status) {
      this.IfNoSign = 'block';
      this.IfSign = 'none';
      this.StatusSignIn = false;
    } else {
      this.IfNoSign = 'none';
      this.IfSign = 'block';
      this.StatusSignIn = false;
      this.userEmail = '';
      this.userPassword = '';
    }
  };

  signOutUser(): void {
    this.userAuthServise.signOut();
  };

  singInUser(): void {
    if (this.userEmail && this.userPassword) {
      this.userAuthServise.signIn(this.userEmail, this.userPassword);
    }
  };

  signInMenu(): void {
    this.StatusSignIn = !this.StatusSignIn;
  }

  scrollToLogin(): void {
    document.getElementById('reserve').scrollIntoView({ behavior: "smooth" });
  }

  activeMenu(): void {
    this.translateMenu = 'translate3d(350px,0,0)';
    this.menuActive = 'translate3d(-350px,0,0)';
    this.menuService.statusMenu(true);
  }

  closeMenu(): void {
    this.translateMenu = 'translate3d(350px,0,0)';
    this.menuActive = 'translate3d(0,0,0)';
    this.menuService.statusMenu(false);
  }

}
