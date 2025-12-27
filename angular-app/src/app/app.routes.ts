import { Routes } from '@angular/router';
import { BookListComponent } from './books/book-list/book-list';
import { BookFormComponent } from './books/book-form/book-form';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BookListComponent },
  { path: 'create', component: BookFormComponent },
  { path: 'edit/:id', component: BookFormComponent }
];
