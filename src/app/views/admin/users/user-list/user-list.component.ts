import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {DtoInputUser} from "../../../../dtos/auth/dto-input-user";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userList: DtoInputUser[] = [] ;

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this._userService.fetchAll().subscribe(
      (userList) => this.userList = userList
    );
  }
}
