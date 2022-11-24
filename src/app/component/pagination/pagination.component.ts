import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pagination} from "./pagination";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit
{

  maxPages: number = 0;

  @Input() index: number = 1;
  @Input() totalCount: number = 50;
  itemsPerPage: number = 5;
  rulerLength: number = 5;

  @Output() page: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void
  {

  }

  constructor()
  {
    this.maxPages = Math.ceil(this.totalCount / this.itemsPerPage);
  }

  get pagination(): Pagination
  {
    const { index, maxPages, rulerLength } = this;
    const numPages = this.ruler(index, maxPages, rulerLength);
    return { index, numPages } as Pagination;
  }

  navigateToPage(pageNumber: number): void
  {
    if(pageNumber !== this.index)
    {
      this.index = pageNumber;
      this.page.emit(this.index);
    }
  }

  ruler(currentIndex: number, maxPages: number, rulerLength: number): number[]
  {
    const array = new Array(rulerLength).fill(null);

    const min = Math.floor(rulerLength / 2);

    return array.map((currentElement, index) => this.indexesOfRuler(currentIndex, index, min, maxPages, rulerLength));
  };

  indexesOfRuler(currentIndex: number, index: number, min: number, maxPages: number, rulerLength: number): number
  {
    if(currentIndex <= min)
    {
      return index + 1;
    }
    else if(currentIndex >= maxPages - min)
    {
      return maxPages - rulerLength + index + 1;
    }
    return currentIndex + index - min;
  };
}
