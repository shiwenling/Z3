import { Pipe, PipeTransform} from '@angular/core';
import {System} from '../system/system';
import {Object} from '../project/object';

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

//
// export class FilterPipe implements PipeTransform {
//
//   transform(object: Object[], filterField: string): any {
//
//     if (!filterField ) {
//       return object;
//     }
//     return object.filter( item => {
//       const fieldValue = item[filterField];
//       return fieldValue.indexOf('序列') >= 0;
//
//     });
//   }

// }
