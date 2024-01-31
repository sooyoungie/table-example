import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/user.service';
import { Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    NgFor,
    NgIf
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService, public router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
      });
  }

  onUserClick(userId: number): void {
    this.router.navigate(['user/user-details', userId]);
  }
}