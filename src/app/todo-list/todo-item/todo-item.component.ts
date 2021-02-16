import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { TodoItem } from '../todo-item.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent {
  @Input() item!: TodoItem;
  @Output() edited = new EventEmitter<TodoItem>();
  @Output() deleted = new EventEmitter<TodoItem>();

  get expired() {
    return Date.parse(this.item.expiry) < Date.now();
  }
  
  public onEdit() {
    this.edited.next(this.item);
  }

  public onDelete() {
    this.deleted.next(this.item);
  }


}
