import {TodoModel} from "./model"
import {TodoView} from "./view"
import {TodoController} from "./controller"




(function main(){


 const app = new TodoController(TodoModel, TodoView);
 const root = document.getElementById("root");

 if(root !== null){
  app.mount(root)
 }

 

})();