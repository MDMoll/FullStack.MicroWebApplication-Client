import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Transaction} from './transaction';
import {tap, catchError} from 'rxjs/operators';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactionUrl = 'http://localhost:8080/budget/transaction/';
  private log(message: string) {
    this.messageService.add(`TransactionService: ${message}`);
  }

  constructor(private httpTransaction: HttpClient,
              private messageService: MessageService
  ) { }
  getTransactions(): Observable<Transaction[]> {
    return this.httpTransaction.get<Transaction[]>(this.transactionUrl)
      .pipe(
        tap(_ => this.log('Transaction Data')),
        catchError(this.handleError<Transaction[]>('getTransactions', []))
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  getTransaction(id: number): Observable<Transaction> {
    const url = `${this.transactionUrl}/{id}`;
    return this.httpTransaction.get<Transaction>(url)
      .pipe(
        tap(_ => this.log(`fetched transaction id=${id}`)),
        catchError(this.handleError<Transaction>(`getTransaction id=${id}`))
      );
  }
}
