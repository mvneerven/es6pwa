import { TodoCreationError, TodoNotFound, TodoUpdateError } from "./errors";
import { Topic, errorTopic } from "./mediator";
export interface ITodo {
  id: number;
  isDone: boolean;
  text: string;
}

export const todoTopics = {
  //commands
  addTodo: new Topic<string>("addTodo"),
  deleteTodo: new Topic<number>("deleteTodo"),
  updateTodo: new Topic<ITodo>("updateTodo"),

  //events
  todoAdded: new Topic<number>("todoAdded"),
  todoDeleted: new Topic<number>("todoDeleted"),
  todoUpdated: new Topic<number>("todoUpdated"),

  //requests/responses
  getAllTodos: new Topic<undefined>("getAllTodos"),
  getTodo: new Topic<number>("getTodo"),
  allTodos: new Topic<ITodo[]>("allTodos"),
  todo: new Topic<ITodo>("todo"),
};

const storageKey = "todos";

function save(todos: ITodo[]) {
  window.localStorage.setItem(storageKey, JSON.stringify(todos));
}

function addTodo(text: string | undefined) {
  if (!text || text === "") {
    errorTopic.publish(new TodoCreationError("empty text"));
    return;
  }
  const todo = { id: -1, text, isDone: false };
  const todos = getAll();
  todo.id = todos.push(todo);
  save(todos);
  todoTopics.todoAdded.publish(todo.id);
  return todo.id;
}
todoTopics.addTodo.subscribe(addTodo, "todoStore");

function updateTodo(updatedTodo: ITodo | undefined) {
  if (!updateTodo || !updatedTodo?.id || !updatedTodo.text) {
    errorTopic.publish(new TodoUpdateError("todo should contain id and text"));
    return;
  }
  const todos = getAll();
  const todo = todos.find((t) => t.id === updatedTodo.id);
  if (!todo) {
    errorTopic.publish(new TodoNotFound(updatedTodo.id));
    return;
  }

  todo.isDone = updatedTodo.isDone;
  todo.text = updatedTodo.text;
  save(todos);
  todoTopics.todoUpdated.publish(updatedTodo.id);
}
todoTopics.updateTodo.subscribe(updateTodo, "todoStore");

function deleteTodo(id: number | undefined) {
  if (!id) {
    errorTopic.publish(new TodoUpdateError("id is undefined"));
    return;
  }
  const todos = getAll();
  const i = todos.findIndex((t) => t.id === id);
  if (i === -1) {
    errorTopic.publish(new TodoNotFound(id));
    return;
  }

  todos.splice(i, 1);
  save(todos);
  todoTopics.todoDeleted.publish(id);
}
todoTopics.deleteTodo.subscribe(deleteTodo, "todoStore");

function getAll() {
  const todos: ITodo[] = JSON.parse(
    window.localStorage.getItem("todos") || "[]"
  );
  return todos;
}

function getOne(id: number | undefined) {
  if (id === -1 || id === undefined) {
    errorTopic.publish(new TodoNotFound(id));
    return;
  }
  const todo = getAll().find((t) => t.id === id);
  return todo;
}

todoTopics.getAllTodos.subscribe(() => {
  todoTopics.allTodos.publish(getAll(), "todoStore");
}, "todoStore");

todoTopics.getTodo.subscribe((id) => {
  const todo = getOne(id);
  if (todo) todoTopics.todo.publish(todo);
}, "todoStore");
