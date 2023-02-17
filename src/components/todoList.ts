import { css, html, LitElement } from "lit";
import { routerTopics } from "../router";
import { ITodo, todoTopics } from "../todoStore";
import { repeat } from "lit/directives/repeat.js";
import { TopicController } from "../mediator";

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

  allTodos: TopicController<ITodo[]>;

  constructor() {
    super();

    this.refreshTodos();
    //Controllers automatically refresh host element,
    //subscribe and dispose subscription on disconnectedCallback
    //https://lit.dev/docs/composition/controllers/
    todoTopics.todoDeleted.createController(this, this.refreshTodos);
    todoTopics.todoAdded.createController(this, this.refreshTodos);
    this.allTodos = todoTopics.allTodos.createController(this);
  }

  protected refreshTodos() {
    todoTopics.getAllTodos.publish();
  }

  protected render() {
    return html` <ul>
      ${repeat(
        this.allTodos.topic.value || [],
        (t) => t.id,
        this.renderTodoItem.bind(this)
      )}
    </ul>`;
  }

  protected renderTodoItem(todo: ITodo, index: number) {
    const itemClickHandler = () =>
      routerTopics.goTo.publish(`/editTodo/${todo.id}`, this.tagName);

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
