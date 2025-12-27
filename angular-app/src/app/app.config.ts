import { ApplicationConfig } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { App } from './app';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      RouterModule.forRoot([
        { path: '', redirectTo: 'books', pathMatch: 'full' },
        { path: 'books', loadComponent: () => import('./books/book-list/book-list').then(m => m.BookListComponent) },
         { path: 'edit/:id', loadComponent: () => import('./books/book-form/book-').then(m => m.BookEditComponent) },
      ])
    )
  ]
};
