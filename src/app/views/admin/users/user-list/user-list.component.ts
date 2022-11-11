import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {DtoInputUser} from "../../../../dtos/auth/dto-input-user";
import {ToastNotificationService} from "../../../../services/toast-notification.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userList: DtoInputUser[] = [];

  constructor(private _userService: UserService, private _toastNotificationService: ToastNotificationService) {
  }

  ngOnInit(): void {
    this._userService.fetchAll().subscribe(
      (userList) => this.userList = userList
    );
  }

  deleteUser(id: number) {
    this._userService.delete(id).subscribe((user) => {
      this.userList = this.userList.filter(value => value.id != user.id);
      this._toastNotificationService.add(`${user.lastName} ${user.firstName} supprimé avec succès`, "success");
    });
  }
}
