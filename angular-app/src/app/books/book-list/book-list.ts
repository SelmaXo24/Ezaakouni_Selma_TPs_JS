import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-list.html'
})
export class BookListComponent implements OnInit {

  books: any[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

 loadBooks() {
  this.bookService.getBooks().subscribe({
    next: data => {
      this.books = data;
      console.log('BOOKS:', data);
    },
    error: err => {
      console.error('ERROR API', err);
    }
  });
}

 deleteBook(id: number) {
  if (confirm('Are you sure you want to delete this book?')) {
    this.bookService.deleteBook(id).subscribe(() => {
      this.loadBooks();
    });
  }
}

}
