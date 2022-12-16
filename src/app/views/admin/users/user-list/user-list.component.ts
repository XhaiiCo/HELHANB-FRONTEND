import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {DtoInputUser} from "../../../../dtos/user/dto-input-user";
import {ToastNotificationService} from "../../../../services/toast-notification.service";
import {environment} from 'src/environments/environment';
import {ModalParams} from "../../../../interfaces/modal-params";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DtoOutputFilteringUsers} from "../../../../dtos/user/dto-output-filtering-users";
import {RolesService} from "../../../../services/roles.service";
import {DtoInputRole} from "../../../../dtos/roles/dto-input-role";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  private readonly BASE_RULER_LENGTH : number = 5;

  //index and also help calculate the offset
  index: number = 1;

  maxPages: number = 0;

  //will be also the limit that we send in the api
  itemsPerPage: number = 4;

  rulerLength: number = this.BASE_RULER_LENGTH;

  userList: DtoInputUser[] = [];
  roleList: DtoInputRole[] = [];

  profilePictureBaseUri: string = environment.pictureUrl;
  defaultProfilePicture: string = environment.defaultProfilePictureUrl;

  deleteModalOptions: ModalParams = {
    displayModal: false,
    titleText: "Confirmation de suppression",
    bodyText: "",
  }
  userToDelete: undefined | number;

  filterForm: FormGroup = this._fb.group({
    role: this._fb.control(""),
    search: this._fb.control(""),
  });

  filter!: DtoOutputFilteringUsers;

  constructor(private _userService: UserService,
              private _roleService: RolesService,
              private _toastNotificationService: ToastNotificationService,
              private _fb: FormBuilder,
              private _authService: AuthService,
  ) {
  }

  ngOnInit(): void {

    this.filter = this.filterForm.value;

    this.count();

    this._fetchUsers();
    this._fetchRoles();
  }

  count() {

    this._userService
      .count(this.filter)
      .subscribe(count =>
    {
      this.maxPages = Math.ceil(count/this.itemsPerPage);

      if(this.maxPages < this.rulerLength) this.rulerLength = this.maxPages;
    });
  }

  private _fetchUsers(): void {

    let offset = (this.index - 1) * this.itemsPerPage;

    this._userService.fetchAll(this.itemsPerPage, offset, this.filter).subscribe(
      (userList) => this.userList = userList
    );
  }

  private _fetchRoles(): void {
    this._roleService.fetchAll().subscribe((roleList) => this.roleList = roleList);
  }

  onModalDeleteAction(isAccepted: boolean) {
    this.deleteModalOptions.displayModal = false;
    if (!isAccepted) return;
    if (!this.userToDelete) return;

    this._userService.delete(this.userToDelete).subscribe({
      next: (user) => {
        this.userList = this.userList.filter(value => value.id != user.id);
        this._toastNotificationService.add(`${user.lastName} ${user.firstName} supprimé avec succès`, "success");

        this.resetAfterDelete();
      },
      error: err => {
        if (err.status === 401) {
          this._toastNotificationService.add(`${err.error}`, "error");
        }
      }
    });

    this.userToDelete = undefined;
  }

  deleteButtonClick(id: number) {
    const user: DtoInputUser | undefined = this.userList.find(value => value.id === id);
    if (!user) return;

    this.userToDelete = id;
    this.deleteModalOptions.bodyText = `Êtes vous sûr de vouloir supprimer ${user.lastName} ${user.firstName}`;
    this.deleteModalOptions.displayModal = true;
  }

  emitFilter() {

    this.index = 1;
    this.rulerLength = this.BASE_RULER_LENGTH;
    this.filter = this.filterForm.value;

    this.count();
    this._fetchUsers();
  }

  isSuperAdmin() {
    return this._authService.user?.role.name === "super-administrateur";
  }

  becomeAdmin(id: number) {
    this._userService.changeRole(id, 3).subscribe(
      user => {
        //Update
        const ind = this.userList.findIndex(item => item.id === user.id);
        this.userList[ind] = user;

        this._toastNotificationService.add(`${user.lastName} ${user.firstName} est maintenant administrateur`)
      }
    )
  }

  downgradeAdmin(id: number) {
    this._userService.changeRole(id, 1).subscribe(
      user => {
        //Update
        const ind = this.userList.findIndex(item => item.id === user.id);
        this.userList[ind] = user;

        this._toastNotificationService.add(`${user.lastName} ${user.firstName} n'est plus administrateur`)
      }
    )
  }

  changePage(event: any)
  {
    this._fetchUsers();
  }

  resetAfterDelete()
  {
    if(this.userList.length == 0)
    {
      this.index--;
      this.rulerLength = this.BASE_RULER_LENGTH;
    }
    this.count();
    this._fetchUsers();
  }
}
