import { Component, OnInit } from '@angular/core';
import { QuoteService, Quote } from '../../services/quote.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  quotes: Quote[] = [];

  constructor(private quoteService: QuoteService) {}

  ngOnInit(): void {
    this.quoteService.getQuotes().subscribe(
      (data) => {
        this.quotes = data;
      },
      (error) => {
        console.error('Error fetching quotes', error);
      }
    );
  }
}
