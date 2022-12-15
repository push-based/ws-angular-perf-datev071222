import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppShellModule } from './app-shell/app-shell.module';
import { AppComponent } from './app.component';
import { MovieService } from './movie/movie.service';
import { ReadAccessInterceptor } from './read-access.interceptor';
import { DirtyCheckedComponent } from './shared/dirty-checked.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppShellModule,
    AppRoutingModule,
    DirtyCheckedComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ReadAccessInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        const movieService = inject(MovieService);
        return () => {
          movieService.genres$.subscribe();
        };
      },
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
