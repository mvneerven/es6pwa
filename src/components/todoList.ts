import { css, html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { topics } from "../mediator";
import { goTo } from "../router";
import { queries, ITodo } from "../todoStore";
import { repeat } from "lit/directives/repeat.js";

export class TodoList extends LitElement {
  static styles = css`
    li {
      cursor: pointer;
      background-color: aquamarine;
      margin-bottom: 5px;
    }

    li[data-status="done"] {
      background-color: cadetblue;
      text-decoration: line-through;
    }

    ul {
      list-style: none;
      padding: 0px;
      margin: 0px;
    }
  `;

  @state()
  todos: ITodo[];

  constructor() {
    super();
    this.refreshTodos();
    topics.todoDeleted.createController(this, this.refreshTodos);
    topics.todoAdded.createController(this, this.refreshTodos);
  }

  protected refreshTodos() {
    this.todos = queries.getAll();
  }

  protected render() {
    return html` <ul>
      ${repeat(this.todos, (t) => t.id, this.renderTodoItem)}
    </ul>`;
  }

  protected renderTodoItem(todo: ITodo, index: number) {
    const itemClickHandler = () => goTo(`/editTodo/${todo.id}`);

    return html` <li
      data-status=${todo.isDone ? "done" : "todo"}
      @click=${itemClickHandler}
    >
      <div>
        <p>${index + 1}. ${todo.isDone ? "Done:" : "Needs to be done:"}</p>
        <p>${todo.text}</p>
      </div>
    </li>`;
  }
}
//Use this method instead of @customElement because of the bug:
// https://github.com/runem/lit-analyzer/issues/287
customElements.define("pwa-todo-list", TodoList);
