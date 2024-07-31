import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.css']
})
export class AddEditBookComponent implements OnInit {
  bookForm: FormGroup;
  isEditMode = false;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.bookForm = this.formBuilder.group({
      id: [0],
      title: ['', Validators.required],
      author: ['', Validators.required],
      publishedDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.bookService.getBook(id).subscribe(data => {
        // Convert the date to YYYY-MM-DD format
        const formattedDate = new Date(data.publishedDate).toISOString().substring(0, 10);
        this.bookForm.patchValue({ ...data, publishedDate: formattedDate });
      });
    }
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const book: Book = this.bookForm.value;
      if (this.isEditMode) {
        this.bookService.updateBook(book.id, book).subscribe(() => {
          this.router.navigate(['/']);
        });
      } else {
        this.bookService.addBook(book).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }
}
