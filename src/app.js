import { css, html, LitElement } from "lit";
import "./components/nameEditor";
import "./components/todoEditor";
import "./components/todoList";
import "./components/iconLink";
import "./components/switch";
import { routerTopics } from "./router";
import { enableTrace } from "./mediator";
import { darkThemeCss, iconCss, lightThemeCss } from "./sharedStyles";

enableTrace();
routerTopics.initRouter.publish();

class Es6PwaApp extends LitElement {
  static styles = [
    lightThemeCss,
    darkThemeCss,
    css`
      :host {
        background-color: var(--main-bg);
        color: var(--main-color);
        display: flex;
        width: 100vw;
        justify-content: center;
      }

      main {
        width: 40%;
      }
      nav {
        display: flex;
        justify-content: space-between;
      }
    `,
    iconCss,
  ];

  static properties = {
    name: { type: String },
  };

  constructor() {
    super();
    this.name = "Somebody";
    this.setAttribute("theme", "dark");

    //Controllers automatically refresh host element,
    //subscribe and dispose subscription on disconnectedCallback
    //https://lit.dev/docs/composition/controllers/
    this.routeController = routerTopics.routeChanged.createController(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.applyThemeHtmlBgColor();
  }

  render() {
    return html`
      <main>
        <header>
          <h1>Todo:</h1>
        </header>
        <nav>
          <pwa-icon-link icon="add" location="/addTodo"> Add </pwa-icon-link>
          <pwa-switch
            @switch=${this.changeTheme}
            .text=${"Theme"}
            onIcon="dark_mode"
            offIcon="light_mode"
          ></pwa-switch>
        </nav>

        <section>${this.renderPage()}</section>
      </main>
    `;
  }

  changeTheme() {
    const theme = this.getAttribute("theme");
    this.setAttribute("theme", theme === "light" ? "dark" : "light");
    this.applyThemeHtmlBgColor();
  }

  applyThemeHtmlBgColor() {
    const bg = getComputedStyle(this).getPropertyValue("--main-bg");
    if (document.body.parentElement)
      document.body.parentElement.style.backgroundColor = bg;
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

  /**
   *
   * @param {number} id
   * @returns
   */
  renderEditTodo(id) {
    return html`<pwa-todo-editor .todoId=${id}></pwa-todo-editor>`;
  }

  renderNotFound() {
    return html` <h3>Oooops, page not found!</h3> `;
  }
}

customElements.define("pwa-app", Es6PwaApp);
