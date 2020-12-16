import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from '../shared/services/admin-auth.service';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.scss']
})
export class AdminAuthComponent implements OnInit {
  email: string;
  password: string;
  constructor(
    private adminAuth: AdminAuthService
  ) { }

  ngOnInit(): void {
  }

  adminSignIn(): void {
    this.adminAuth.signInAdmin(this.email, this.password)
  }

}
