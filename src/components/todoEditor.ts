import { html, LitElement } from "lit";
import { property, query, state } from "lit/decorators.js";
import { goTo } from "../router";
import { actions, queries, ITodo } from "../todoStore";

export class TodoEditor extends LitElement {
  @query("form[name=todo]")
  todoForm: HTMLFormElement;

  @property()
  todoId: number | undefined;

  @state()
  todo: ITodo;

  connectedCallback() {
    super.connectedCallback();
    if (this.todoId) {
      this.todo = queries.getOne(this.todoId);
    }
  }

  protected render() {
    return html` <form action="#" name="todo">
        <input type="text" name="text" value=${this.todo?.text} />
      </form>
      <button @click=${this.saveTodo}>Save</button>
      ${this.todoId
        ? html` <button @click=${this.completeTodo}>Complete</button> `
        : ""}`;
  }

  private completeTodo() {
    this.todo.isDone = true;
    this.todo.text = this.getTodoText();
    actions.updateTodo(this.todo);
    goTo("/");
  }

  private getTodoText() {
    const data = new FormData(this.todoForm);
    return data.get("text").toString();
  }

  private saveTodo() {
    const text = this.getTodoText();
    actions.addTodo(text);
    goTo("/");
  }
}
//Use this method instead of @customElement because of the bug:
// https://github.com/runem/lit-analyzer/issues/287
customElements.define("pwa-todo-editor", TodoEditor);
