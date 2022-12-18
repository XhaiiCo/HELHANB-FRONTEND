import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  pictureBaseUri: string = environment.pictureUrl;

  @Input() images: string[] = [];
  @Input() indicators = true;
  @Input() controls = true;
  @Input() adLink: string = "";

  selectedIndex: number  = 0;
  constructor() { }

  ngOnInit(): void {
  }

  selectImage(index: number) {
    this.selectedIndex = index;
  }

  /**
   * If the selectedIndex is 0, then set the selectedIndex to the last image in the array, otherwise, decrement the
   * selectedIndex by 1
   */
  onPrevClick() {
    if (this.selectedIndex === 0) {

      this.selectedIndex = this.images.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  /**
   * If the selectedIndex is equal to the length of the images array, then set the selectedIndex to 0, otherwise increment
   * the selectedIndex by 1
   */
  onNextClick() {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

}
