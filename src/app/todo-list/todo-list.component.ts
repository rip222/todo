import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TodoItem } from './todo-item.model';
import { TodoListService } from './todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  public form!: FormGroup;
  public showForm = false;
  public formSubmitted = false;  
  public todos$: Observable<TodoItem[]>;
  public formAction: 'Create' | 'Update' = 'Create';
  private selectedTodo: TodoItem | null = null;;
  constructor(
    private todoListService: TodoListService,
    private fb: FormBuilder,
    ) {
    this.todos$ = this.todoListService.todos$;
    this.initForm();
   }

  get f() {
    return this.form.controls;
  }

  private initForm() {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', Validators.required],
      expiry: ['', Validators.required],
      complete: [false],
      favorite: [false],
    })
  }

  public toggleShowForm() {
    this.showForm = !this.showForm;
    this.formAction = 'Create';
  }

  public onSubmit() {
    this.formSubmitted = true;
    if (this.form.valid) {
      if (this.formAction === 'Create') {
        const todo: TodoItem = {
          ...this.form.value,
          id: Date.now(),
        }
        this.todoListService.add(todo)
      } else {
        this.todoListService.update({
          ...this.form.value,
          id: this.selectedTodo?.id,
        });
      }
      this.form.reset();
      this.formSubmitted = false;
      this.showForm = false;
      this.selectedTodo = null;
    }
  }

  public onEdit(item: TodoItem) {
    this.form.patchValue(item);
    this.selectedTodo = item;
    this.showForm = true;
    this.formAction = 'Update';
  }

  public onDelete(item: TodoItem) {
    if (confirm('Are you sure you want to delete the item?')) {
      this.todoListService.delete(item);
    }
  }
}
