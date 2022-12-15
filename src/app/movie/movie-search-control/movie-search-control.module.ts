import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirtyCheckedComponent } from '../../shared/dirty-checked.component';
import { MovieModule } from '../movie.module';
import { MovieSearchControlComponent } from './movie-search-control.component';

@NgModule({
  declarations: [MovieSearchControlComponent],
  imports: [CommonModule, MovieModule, DirtyCheckedComponent],
  exports: [MovieSearchControlComponent],
})
export class MovieSearchControlModule {}
