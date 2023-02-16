import { css, html, LitElement } from "lit";
import { topics } from "./mediator";
import "./components/nameEditor";
import "./components/todoEditor";
import "./components/link";
import "./components/todoList";
import { initRouter } from "./router";

initRouter();

class Es6PwaApp extends LitElement {
  static styles = css`
    p {
      color: blue;
    }
  `;

  static properties = {
    name: { type: String },
  };

  constructor() {
    super();
    this.name = "Somebody";
    this.routeController = topics.routeChanged.createController(this);
  }

  render() {
    return html`
      <p>Hello, ${this.name}!</p>
      <pwa-name-editor
        data-placeholder="Somebody"
        @nameChanged=${this.handleNameChange}
      ></pwa-name-editor>
      <pwa-link .location=${"/addTodo"}>Add todo</pwa-link>

      <section>${this.renderPage()}</section>
    `;
  }

  renderPage() {
    if (!this.routeController.topic.value) return;

    const routeData = this.routeController.topic.value.routeData;
    switch (routeData.page) {
      case "":
        return this.renderTodoList();
      case "editTodo":
        if (routeData.id) return this.renderEditTodo(routeData.id);
        else return this.renderNotFound();
      case "addTodo":
        return this.renderAddTodo();
      default:
        return this.renderNotFound();
    }
  }

  renderTodoList() {
    return html`<pwa-todo-list></pwa-todo-list>`;
  }

  renderAddTodo() {
    return html`<pwa-todo-editor></pwa-todo-editor>`;
  }

  renderEditTodo(id) {
    return html`<pwa-todo-editor .todoId=${id}></pwa-todo-editor>`;
  }

  renderNotFound() {
    return html` <h3>Oooops, page not found!</h3> `;
  }

  /**
   *
   * @param {CustomEvent<{ name: string; }>} e
   */
  handleNameChange(e) {
    console.log(e);
    this.name = e.detail.name;
  }
}

customElements.define("pwa-app", Es6PwaApp);
