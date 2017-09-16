import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excerpt'
})
export class ExcerptPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    let words = value.split(' ', args);
    let excerpt = words.join(' ');
    return excerpt += '...';
  }

}
