import { TodoView } from "./view";
import { TodoModel } from "./model";
import { Todo } from "./model";
import { Class,create } from "./utils";


// interface ITodoModel {
//  new (): TodoModel;
//  editTodo: () => void;
// }
 

export class TodoController {
	model: TodoModel;
	view!: TodoView;
	private viewContructor!: Class<TodoView>;

	constructor(model: Class<TodoModel>, viewConstructor: Class<TodoView>) {
		this.model = create(model);
		this.model.bindTodoListChanged(this.onTodoListChanged);
		this.viewContructor = viewConstructor;
	}

	onTodoListChanged = (todos: Todo[]) => {
		this.view.displayTodos(todos);
	};

	handleAddTodo = (todoText: string) => {
		this.model.addTodo(todoText);
	};

	handleEditTodo = (id: number, todoText: string) => {
		this.model.editTodo(id, todoText);
	};

	handleDeleteTodo = (id: number) => {
		this.model.deleteTodo(id);
	};

	handleToggleTodo = (id: number) => {
		this.model.toggleTodo(id);
	};

	mount(root : HTMLElement){

		this.view = create(this.viewContructor,root);
  
  
		this.view.bindAddTodo(this.handleAddTodo);
		this.view.bindEditTodo(this.handleEditTodo);
		this.view.bindDeleteTodo(this.handleDeleteTodo);
		this.view.bindToggleTodo(this.handleToggleTodo);
		this.view.displayTodos(this.model.todos);
	}

}
