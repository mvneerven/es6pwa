import { css, html, LitElement } from "lit";
import { routerTopics } from "../router";
import { ITodo, todoTopics } from "../todoStore";
import { repeat } from "lit/directives/repeat.js";
import { TopicController } from "../mediator";
import { iconCss, roundedBlock } from "../sharedStyles";

export class TodoList extends LitElement {
  static styles = [
    iconCss,
    roundedBlock,
    css`
      :host {
        display: block;
        margin-top: 10px;
      }
      li {
        display: flex;
        align-items: center;
        cursor: pointer;
      }

      li[data-status="done"] div {
        text-decoration: line-through;
      }

      li[data-status="done"].rounded-block {
        background-color: var(--third-bg);
      }

      menu {
        list-style: none;
        padding: 0px;
        margin: 0px;
      }
      .text {
        width: 100%;
      }
      .prio {
        font-size: 40px;
        padding-right: 10px;
      }

      .icon {
        color: var(--third-color);
      }
    `,
  ];

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
    return html` <menu>
      ${repeat(
        this.allTodos.topic.value || [],
        (t) => t.id,
        this.renderTodoItem.bind(this)
      )}
    </menu>`;
  }

  protected renderTodoItem(todo: ITodo, index: number) {
    const itemClickHandler = (e: Event) => {
      if (todo.isDone) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      routerTopics.goTo.publish(`/editTodo/${todo.id}`, this.tagName);
    };
    const itemKeypressHandler = (e: KeyboardEvent) => {
      if (e.type === "click" || e.key === "Enter") itemClickHandler(e);
    };

    return html` <li
      class="rounded-block"
      role="link"
      tabindex="0"
      data-status=${todo.isDone ? "done" : "todo"}
      @click=${itemClickHandler}
      @keypress=${itemKeypressHandler}
    >
      <div class="prio">${index + 1}</div>
      <div class="text">${todo.text}</div>
      <i class="icon">${todo.isDone ? "done" : "arrow_right"}</i>
    </li>`;
  }
}

//Use this method instead of @customElement because of the bug:
// https://github.com/runem/lit-analyzer/issues/287
customElements.define("pwa-todo-list", TodoList);
