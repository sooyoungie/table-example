import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../core/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: any;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUserDetails(+userId)
        .subscribe(user => {
          this.user = user;
        });
    }
  }

  backToUserList(): void {
    this.router.navigate(['user/user-list']);
  }
}