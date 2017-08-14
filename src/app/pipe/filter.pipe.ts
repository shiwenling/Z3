import { Pipe, PipeTransform} from '@angular/core';
import {System} from '../system/system';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(system: System[], filterField: string, keyword: string): any {

    if (!filterField || !keyword) {
      return system;
    }
    return system.filter( item => {
      const fieldValue = item[filterField];
      return fieldValue.indexOf(keyword) >= 0;

    });
  }

}
