import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoItem } from './todo-item.model';

@Injectable()
export class TodoListService {

  private _todos = new BehaviorSubject<TodoItem[]>([]);

  get todos$() {
    return this._todos.asObservable();
  }

  public add(item: TodoItem) {
    const state = this._todos.getValue();
    this.updateState([...state, item]);
  }

  public update(item: TodoItem) {
    const state = this._todos.getValue();
    const idx = state.findIndex(todo => todo.id === item.id);
    state[idx] = item;
    this.updateState(state);
  }

  public delete(item: TodoItem) {
    const state = this._todos.getValue();
    this.updateState(state.filter(todo => todo.id !== item.id))
  }

  private updateState(state: TodoItem[]) {
    state.sort((a,b) => {
      if (a.complete === b.complete) {
        if (a.favorite === b.favorite) {
          return 1;
        } else {
          return -1;
        }
      }
      if (a.complete) {
        return -1;
      }
      else {
        return 1;
      }
    });
    console.log(state)
    this._todos.next(state);
  }
}
