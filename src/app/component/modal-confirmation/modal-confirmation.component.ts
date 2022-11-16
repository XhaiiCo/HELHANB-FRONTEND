import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.scss']
})
export class ModalConfirmationComponent implements OnInit {

  @Input() showModal: boolean = false ;
  @Input() bodyText: string = "" ;
  @Input() title: string = "" ;
  @Output() isAccepted: EventEmitter<boolean> = new EventEmitter<boolean>() ;

  constructor() { }

  ngOnInit(): void {
  }

  hiddeModal() {
    this.showModal = false ;
  }

  rejected(){
    this.isAccepted.emit(false) ;
    this.hiddeModal() ;
  }

  accepted(){
    this.isAccepted.emit(true) ;
    this.hiddeModal() ;
  }

}
