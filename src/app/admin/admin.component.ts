import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from '../shared/services/admin-auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private adminAuth: AdminAuthService
  ) { }

  ngOnInit(): void {
  }

  adminSignOut(): void {
    this.adminAuth.signOutAdmin();
  }

}
