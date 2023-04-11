



export class Todo {
	id: number;
	text: string;
	isComplete: boolean;
	dueDate?: Date;

	constructor(id: Todo["id"], text: Todo["text"], isComplete: Todo["isComplete"], dueDate: Todo["dueDate"]){
		this.id = id;
		this.text= text;
		this.isComplete = isComplete;
		this.dueDate = dueDate;
	}
}

/**
 * @class Model 
 *
 * Manages the data of the application.
 */



export class TodoModel {
	todos: Todo[];
	onTodoListChanged?: (todos: Todo[]) => void;
 
	constructor() {

		const localStorageTodos = localStorage.getItem("todos");

		if(localStorageTodos !== null){
			this.todos = JSON.parse(localStorageTodos);
			return;
		} else{
			this.todos =  [];
		}
 
 
   
	}

	//onTodoListChanged(todos: Todo[]): void

	bindTodoListChanged(callback : (todos: Todo[]) => void) {
		this.onTodoListChanged = callback;
	}

	_commit(todos: Todo[]) {
		if(this.onTodoListChanged){
			this.onTodoListChanged(todos);
			localStorage.setItem("todos", JSON.stringify(todos));
			return;
		}
		throw new Error("Bind onTodoListChanged to the View method that rerenders the dom");
	}

	addTodo(todoText: string) {
		const todo: Todo= {
			id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
			text: todoText,
			isComplete: false,
		};

		this.todos.push(todo);

		this._commit(this.todos);
	}

	editTodo(id: Todo["id"], updatedText: Todo["text"]) {

		this.todos = this.todos.map(todo =>
			todo.id === id ? { id: todo.id, text: updatedText, isComplete: todo.isComplete } : todo
		);

		this._commit(this.todos);
	}

	deleteTodo(id: Todo["id"]) {
		this.todos = this.todos.filter(todo => todo.id !== id);

		this._commit(this.todos);
	}

	toggleTodo(id: Todo["id"]) {
		this.todos = this.todos.map(todo =>
			todo.id === id ? { id: todo.id, text: todo.text, isComplete: !todo.isComplete } : todo
		);

		this._commit(this.todos);
	}
}
