import { css, html, LitElement } from "lit";
import { property, query, state } from "lit/decorators.js";
import { routerTopics } from "../router";
import { roundedBlock, roundedButton } from "../sharedStyles";
import { ITodo, todoTopics } from "../todoStore";

export class TodoEditor extends LitElement {
  @query("form[name=todo]")
  todoForm: HTMLFormElement | undefined;

  @property()
  todoId: number | undefined;

  @state()
  todo: ITodo | undefined;

  static styles = [
    roundedBlock,
    roundedButton,
    css`
      :host {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
      }

      form {
        display: flex;
        flex-direction: column;
      }

      .buttons {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
      }

      button.rounded-button {
        border: none;
        font-size: inherit;
        align-items: center;
        color: var(--main-color);
        padding: 10px;
        cursor: pointer;
      }
    `,
  ];

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
    return html`
      <form action="#" name="todo">
        <textarea
          class="rounded-block"
          name="text"
          rows="5"
          .value=${this.todo?.text || ""}
        >
        </textarea>
        <section class="buttons">
          <button
            class="rounded-button"
            ?disabled=${!this.canSave}
            @click=${this.saveTodo}
          >
            Save
          </button>
          ${this.todoId
            ? html`
                <button
                  class="rounded-button"
                  ?disabled=${!this.canCompplete}
                  @click=${this.completeTodo}
                >
                  Complete
                </button>
              `
            : ""}
        </section>
      </form>
    `;
  }
  private get canCompplete() {
    return this.todoId && this.todo;
  }
  private get canSave() {
    return (this.todoId && this.todo) || !this.todoId;
  }

  private completeTodo(e: Event) {
    e.preventDefault();
    if (!this.todo) return;
    this.todo.isDone = true;
    this.todo.text = this.getTodoText();
    todoTopics.updateTodo.publish(this.todo);
  }

  private getTodoText() {
    return new FormData(this.todoForm).get("text")?.toString().trim() || "";
  }

  private saveTodo(e: Event) {
    e.preventDefault();
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
