import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {DtoInputUser} from "../../../../dtos/user/dto-input-user";
import {ToastNotificationService} from "../../../../services/toast-notification.service";
import {AuthService} from "../../../../services/auth.service";
import {environment} from 'src/environments/environment';
import {DeleteModalOptions} from "../../../../interfaces/delete-modal-options";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DtoOutputFilteringUsers} from "../../../../dtos/user/dto-output-filtering-users";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userList: DtoInputUser[] = [];
  profilePictureBaseUri: string = environment.pictureUrl;

  deleteModalOptions: DeleteModalOptions = {
    showDeleteUserConfirmationModal: false,
    titleText: "Confirmation de suppression",
    bodyText: "",
  }
  userToDelete: undefined | number;

  filterForm: FormGroup = this._fb.group({
    role: this._fb.control(""),
    search: this._fb.control(""),
  });

  constructor(private _userService: UserService,
              private _toastNotificationService: ToastNotificationService,
              private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    this._userService.fetchAll().subscribe(
      (userList) => this.userList = userList
    );
  }

  onModalDeleteAction(isAccepted: boolean) {
    this.deleteModalOptions.showDeleteUserConfirmationModal = false;
    if (!isAccepted) return;
    if (!this.userToDelete) return;

    this._userService.delete(this.userToDelete).subscribe((user) => {
      this.userList = this.userList.filter(value => value.id != user.id);
      this._toastNotificationService.add(`${user.lastName} ${user.firstName} supprimé avec succès`, "success");
    });

    this.userToDelete = undefined;
  }

  deleteButtonClick(id: number) {
    const user: DtoInputUser | undefined = this.userList.find(value => value.id === id);
    if (!user) return;

    this.userToDelete = id;
    this.deleteModalOptions.bodyText = `Êtes vous sûr de vouloir supprimer ${user.lastName} ${user.firstName}`;
    this.deleteModalOptions.showDeleteUserConfirmationModal = true;
  }

  emitFilter() {
    const filter: DtoOutputFilteringUsers = this.filterForm.value ;

    this._userService.fetchAll(filter).subscribe(
      (userList) => this.userList = userList
    );
  }
}
