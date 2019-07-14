import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const tail = value.length < args ? value : '...';
    const str = value.substring(0, args) + tail;
    return str;
  }

}
