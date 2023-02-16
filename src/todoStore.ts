import { TodoNotFound } from "./error";
import { topics } from "./mediator";
export interface ITodo {
  id: number;
  isDone: boolean;
  text: string;
}

const storageKey = "todos";

function save(todos: ITodo[]) {
  window.localStorage.setItem(storageKey, JSON.stringify(todos));
}

export const actions = {
  addTodo: (text: string) => {
    const todo = { id: -1, text, isDone: false };
    const todos = queries.getAll();
    todo.id = todos.push(todo);
    save(todos);
    topics.todoAdded.publish(todo.id);
    return todo.id;
  },
  updateTodo: (updatedTodo: ITodo) => {
    const todos = queries.getAll();
    const todo = todos.find((t) => t.id === updatedTodo.id);
    if (!todo) {
      topics.error.publish(new TodoNotFound(updatedTodo.id));
      return;
    }

    todo.isDone = updatedTodo.isDone;
    todo.text = updatedTodo.text;
    save(todos);
    topics.todoUpdated.publish(updatedTodo.id);
  },
  deleteTodo: (id: number) => {
    const todos = queries.getAll();
    const i = todos.findIndex((t) => t.id === id);
    if (i === -1) {
      topics.error.publish(new TodoNotFound(id));
      return;
    }

    todos.splice(i, 1);
    save(todos);
    topics.todoDeleted.publish(id);
  },
};

export const queries = {
  getAll: () => {
    const todos: ITodo[] = JSON.parse(window.localStorage.getItem("todos"));

    return todos || [];
  },
  getOne: (id: number) => {
    return queries.getAll().find((t) => t.id === id);
  },
};
