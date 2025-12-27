import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.html'
})
export class BookFormComponent implements OnInit {

  bookForm!: FormGroup;
  bookId?: number;
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './book-form.html'
})
export class BookFormComponent implements OnInit {

  bookForm!: FormGroup;
  bookId?: number;
  loading: boolean = false;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialiser le formulaire
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required]
    });

    // Récupérer l'id si on est en mode édition
    const idParam = this.route.snapshot.paramMap.get('id');
    this.bookId = idParam ? Number(idParam) : undefined;

    if (this.bookId) {
      this.loading = true;
      this.bookService.getBook(this.bookId).subscribe({
        next: book => {
          this.bookForm.patchValue(book);
          this.loading = false;
        },
        error: err => {
          console.error('Erreur lors du chargement du livre', err);
          this.error = 'Impossible de charger le livre';
          this.loading = false;
        }
      });
    }
  }

  submit() {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    if (this.bookId) {
      // Mise à jour
      this.bookService.updateBook(this.bookId, this.bookForm.value).subscribe({
        next: () => this.router.navigate(['/books']),
        error: err => {
          console.error('Erreur lors de la mise à jour', err);
          this.error = 'Impossible de mettre à jour le livre';
          this.loading = false;
        }
      });
    } else {
      // Création
      this.bookService.addBook(this.bookForm.value).subscribe({
        next: () => this.router.navigate(['/books']),
        error: err => {
          console.error('Erreur lors de la création', err);
          this.error = 'Impossible de créer le livre';
          this.loading = false;
        }
      });
    }
  }
}

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required]
    });

    this.bookId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.bookId) {
      this.bookService.getBook(this.bookId).subscribe(book => {
        this.bookForm.patchValue(book);
      });
    }
  }

  submit() {
    if (this.bookId) {
      this.bookService.updateBook(this.bookId, this.bookForm.value)
        .subscribe(() => this.router.navigate(['/books']));
    } else {
      this.bookService.addBook(this.bookForm.value)
        .subscribe(() => this.router.navigate(['/books']));
    }
  }
}
