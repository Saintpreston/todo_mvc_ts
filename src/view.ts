/**
 * Visual representation of the model.
 */

import { Todo } from "./model";





 export class TodoView  {
  private app: HTMLElement;
  private form: HTMLFormElement;
  private input: HTMLInputElement;
  private submitButton: HTMLButtonElement;
  private title: HTMLHeadingElement;
  private todoList: HTMLUListElement;
  private _temporaryTodoText: string;


  constructor(app: HTMLElement) {
    this.app = app;

    this.form = this.createElement("form");
    this.input = this.createElement("input");
    this.input.type = "text";
    this.input.placeholder = "Add todo";
    this.input.name = "todo";
    this.submitButton = this.createElement("button");
    this.submitButton.textContent = "Submit";
    this.form.append(this.input, this.submitButton);
    this.title = this.createElement("h1");
    this.title.textContent = "Todos";
    this.todoList = this.createElement("ul", "todo-list");
    this.app.append(this.title, this.form, this.todoList);

    this._temporaryTodoText = "";
    this._initLocalListeners();
  }

  get _todoText() {
    return this.input.value;
  }

  _resetInput() {
    this.input.value = "";
  }

  createElement<T extends keyof HTMLElementTagNameMap>(
    tag: T,
    className?: string
  ) {
    const element = document.createElement<T>(tag);

    if (className) {
      element.classList.add(className);
    }

    return element;
  }

  getElement(selector: string) {
    const element = document.querySelector(selector);

    return element;
  }

  displayTodos(todos: Todo[]) {
    // Delete all nodes
    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild);
    }

    // Show default message
    if (todos.length === 0) {
      const p = this.createElement("p");
      p.textContent = "Nothing to do! Add a task?";
      this.todoList.append(p);
    } else {
      // Create nodes
      todos.forEach((todo) => {
        const li = this.createElement("li");
        li.id = todo.id.toString();

        const checkbox = this.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.isComplete;

        const span = this.createElement("span");
        span.contentEditable = true.toString();
        span.classList.add("editable");

        if (todo.isComplete) {
          const strike = this.createElement("s");
          strike.textContent = todo.text;
          span.append(strike);
        } else {
          span.textContent = todo.text;
        }

        const deleteButton = this.createElement("button", "delete");
        deleteButton.textContent = "Delete";
        li.append(checkbox, span, deleteButton);

        // Append nodes
        this.todoList.append(li);
      });
    }

    // Debugging
    console.log(todos);
  }

  _initLocalListeners() {
    this.todoList.addEventListener("input", (event) => {
      if ((event.target as HTMLUListElement).className.includes("editable")) {
        this._temporaryTodoText = (event.target as HTMLUListElement).innerText;
      }
    });

   
  }

  bindAddTodo(handler: Function) {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (this._todoText) {
        handler(this._todoText);
        this._resetInput();
      }
    });
  }

  bindDeleteTodo(handler: Function) {
    this.todoList.addEventListener("click", (event) => {
     
      if(event.target === null) return;

      const target = event.target as EventTarget & {
       className: string;
       parentElement: HTMLElement
      };

      if (target.className.includes("delete")) {
        const id = parseInt(target.parentElement.id);

        handler(id);
      }
    });
  }

  bindEditTodo(handler: Function) {
    this.todoList.addEventListener("focusout", (event) => {


     if(event.target === null) return;

     const target = event.target as EventTarget & {
      className: string;
      parentElement: HTMLElement
     };


      if (this._temporaryTodoText.trim()) {
        const id = parseInt(target.parentElement.id);

        handler(id, this._temporaryTodoText);
        this._temporaryTodoText = "";
      }
    });
  }

  bindToggleTodo(handler: Function) {



    this.todoList.addEventListener("change", (event) => {

     if(event.target === null) return;

     const target = event.target as EventTarget & {
      type: string;
      parentElement: HTMLElement;
     };

     
      if (target.type === "checkbox") {
        const id = parseInt(target.parentElement.id);
        handler(id);
      }
    });
  }
}

