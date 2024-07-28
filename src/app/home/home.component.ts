import { Component, OnInit } from '@angular/core';

import { Observable, Subscriber } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  messages: string[] = [];

  ngOnInit(): void {
    const onSubscribe = (subscriber: Subscriber<number>) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
      }, 1000);

      return () => this.messages.push('[finalize]');
    };

    const observable = new Observable(onSubscribe);

    this.messages.push(`-- just before subscribe --\n`);

    const observer = {
      next: (x: number) => {
        this.messages.push(`[next] got value ${x}`);
      },
      error: (err: any) => {
        this.messages.push(`[error] something wrong occurred: ${err}`);
      },
      complete: () => {
        this.messages.push('[complete] done');
      },
    };

    observable.subscribe(observer);
    this.messages.push('-- just after subscribe --');
  }
}
