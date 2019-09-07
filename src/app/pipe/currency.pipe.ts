import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
      if (args === 'INR') {
        const icon = '<i class="fa fa-rupee"></i>';
        const str = icon + value;
        return str;
      } else {
        return value;
      }
  }

}
