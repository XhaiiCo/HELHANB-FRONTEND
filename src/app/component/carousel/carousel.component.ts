import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  profilePictureBaseUri: string = environment.pictureUrl;

  @Input() images: string[] = []
  @Input() indicators = true;
  @Input() controls = true;
  @Input() link: string | undefined ;

  selectedIndex: number  = 0;
  constructor() { }

  ngOnInit(): void {
  }

  selectImage(index: number) {
    this.selectedIndex = index;
  }

  onPrevClick() {
    if (this.selectedIndex === 0) {

      this.selectedIndex = this.images.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  onNextClick() {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

}
