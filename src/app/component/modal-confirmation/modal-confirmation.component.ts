import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalParams} from "../../interfaces/modal-params";

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.scss']
})
export class ModalConfirmationComponent implements OnInit {

  @Input() modalParams!: ModalParams ;
  @Output() isAccepted: EventEmitter<boolean> = new EventEmitter<boolean>() ;

  constructor() { }

  ngOnInit(): void {
  }

  rejected(){
    this.isAccepted.emit(false) ;
  }

  accepted(){
    this.isAccepted.emit(true) ;
  }
}
