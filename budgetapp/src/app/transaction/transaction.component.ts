import {Component, Input, OnInit} from '@angular/core';

import {Transaction} from '../transaction';
import {TransactionService} from '../transaction.service';
import {User} from '../user';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions: Transaction[];
  selectedTransaction: Transaction;

  @Input() transaction: Transaction;
  constructor(private transactionService: TransactionService) {
  }

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions(): void {
    this.transactionService.getTransactions()
      .subscribe(transactions => this.transactions = transactions);
  }

  onSelect(transaction: Transaction): void {
    this.selectedTransaction = transaction;
  }
}
