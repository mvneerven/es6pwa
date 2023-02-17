import { html, LitElement } from "lit";
import { property, query, state } from "lit/decorators.js";
import { routerTopics } from "../router";
import { ITodo, todoTopics } from "../todoStore";

export class TodoEditor extends LitElement {
  @query("form[name=todo]")
  todoForm: HTMLFormElement | undefined;

  @property()
  todoId: number | undefined;

  @state()
  todo: ITodo | undefined;

  connectedCallback() {
    super.connectedCallback();

    if (this.todoId) {
      todoTopics.getTodo.publish(this.todoId);
      //Controllers automatically refresh host element,
      //subscribe and dispose subscription on disconnectedCallback
      //https://lit.dev/docs/composition/controllers/
      todoTopics.todo.createController(this, (t) => {
        if (t && t.id === this.todoId) this.todo = t;
      });
      todoTopics.todoUpdated.createController(this, this.goToHomePage);
    } else {
      todoTopics.todoAdded.createController(this, this.goToHomePage);
    }
  }

  goToHomePage() {
    routerTopics.goTo.publish("/", this.tagName);
  }

  protected render() {
    return html` <form action="#" name="todo">
        <input type="text" name="text" value=${this.todo?.text || ""} />
      </form>
      <button ?disabled=${!this.canSave} @click=${this.saveTodo}>Save</button>
      ${this.todoId
        ? html`
            <button ?disabled=${!this.canCompplete} @click=${this.completeTodo}>
              Complete
            </button>
          `
        : ""}`;
  }
  private get canCompplete() {
    return this.todoId && this.todo;
  }
  private get canSave() {
    return (this.todoId && this.todo) || !this.todoId;
  }

  private completeTodo() {
    if (!this.todo) return;
    this.todo.isDone = true;
    this.todo.text = this.getTodoText();
    todoTopics.updateTodo.publish(this.todo);
  }

  private getTodoText() {
    return new FormData(this.todoForm).get("text")?.toString() || "";
  }

  private saveTodo() {
    const text = this.getTodoText();
    if (this.todoId && this.todo) {
      this.todo.text = text;
      todoTopics.updateTodo.publish(this.todo);
    } else todoTopics.addTodo.publish(text);
  }
}
//Use this method instead of @customElement because of the bug:
// https://github.com/runem/lit-analyzer/issues/287
customElements.define("pwa-todo-editor", TodoEditor);
