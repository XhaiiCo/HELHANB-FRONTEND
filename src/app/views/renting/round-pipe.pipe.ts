import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round'
})
export class RoundPipePipe implements PipeTransform {

  transform(value: number): unknown {
    return Math.floor(value * 100) / 100;
  }

}
