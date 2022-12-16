import {Component, Input, OnInit} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DateService } from 'src/app/services/date.service';
import { environment } from 'src/environments/environment';
import {DtoInputAdReservation} from "../../../../dtos/ad/dto-input-my-ads";
import {ConversationService} from "../../../../services/conversation.service";

@Component({
  selector: 'app-my-ad-confirmed-reservation-list',
  templateUrl: './my-ad-confirmed-reservation-list.component.html',
  styleUrls: ['./my-ad-confirmed-reservation-list.component.scss']
})
export class MyAdConfirmedReservationListComponent implements OnInit {

  profilePictureBaseUri: string  = environment.pictureUrl ;
  @Input() reservations!: DtoInputAdReservation[] ;

  constructor(
    public dateService: DateService,
    private _authService: AuthService,
    public _conversationService: ConversationService,
  ) { }

  ngOnInit(): void {
  }

  contactUser(renterId: number) {
    if (this._authService.user !== null) {
      this._conversationService.redirectToTheConversationPage(this._authService.user.id, renterId)
    }
  }
}
