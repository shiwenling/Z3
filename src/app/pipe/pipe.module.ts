/**
 * Created by TP on 2017/8/14.
 */
import { NgModule }      from '@angular/core';
import {FilterPipe} from './filter.pipe';

@NgModule({
  imports:        [],
  declarations:   [FilterPipe],
  exports:        [FilterPipe],
})

export class PipeModule {

  static forRoot() {
    return {
      ngModule: PipeModule,
      providers: [],
    };
  }
}
