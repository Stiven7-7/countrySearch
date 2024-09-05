import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})

export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @Input() placeholder: string = '';
  @Output() onValue = new EventEmitter<string>();
  @Output() onDebounce  = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe( value =>{
        this.onDebounce.emit( value );
      });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }


  emitValue(value: string){
    this.onValue.emit(value);
  }

  onKeyPress( searchTerm: string ){
    this.debouncer.next( searchTerm );

  }
}
