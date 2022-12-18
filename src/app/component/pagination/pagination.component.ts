import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pagination} from "../../interfaces/pagination";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() maxPages: number = 0;

  @Input() rulerLength: number = 5;

  @Input() index: number = 1;
  @Output() indexChange: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
  }

  constructor(private _route: ActivatedRoute, private _router: Router) {
  }

  get pagination(): Pagination {
    const {index, maxPages, rulerLength} = this;
    const numPages = this.ruler(index, maxPages, rulerLength);
    return {index, numPages} as Pagination;
  }

  /**
   * If the page number is not the current page number, then set the current page number to the new page number and emit
   * the new page number
   * @param {number} pageNumber - The page number to navigate to.
   */
  navigateToPage(pageNumber: number): void {
    if (pageNumber !== this.index) {
      this.index = pageNumber;
      this.indexChange.emit(this.index);
    }
  }

  /**
   * It returns an array of indexes of the ruler
   * @param {number} currentIndex - the current page number
   * @param {number} maxPages - the total number of pages
   * @param {number} rulerLength - the length of the ruler
   * @returns An array of numbers.
   */
  ruler(currentIndex: number, maxPages: number, rulerLength: number): number[] {
    const array = new Array(rulerLength).fill(null);

    const min = Math.floor(rulerLength / 2);

    return array.map((currentElement, index) => this.indexesOfRuler(currentIndex, index, min, maxPages, rulerLength));
  }

  indexesOfRuler(currentIndex: number, index: number, min: number, maxPages: number, rulerLength: number): number {
    if (currentIndex <= min) {
      return index + 1;
    } else if (currentIndex >= maxPages - min) {
      return maxPages - rulerLength + index + 1;
    }
    return currentIndex + index - min;
  }
}
