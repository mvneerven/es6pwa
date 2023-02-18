import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { routerTopics } from "../router";
import { iconCss, roundedButton } from "../sharedStyles";

export class IconLlink extends LitElement {
  @property({ type: String })
  location: string | undefined;

  @property({ type: String })
  icon: string | undefined;

  static styles = [
    roundedButton,
    css`
      :host {
        display: inline-block;
        width: auto;
      }

      a.rounded-button {
        display: flex;
        color: inherit;
        text-decoration: none;
        align-items: center;
        padding-right: 10px;
      }
    `,
    iconCss,
  ];

  constructor() {
    super();
  }

  render() {
    return html`
      <a
        class="rounded-button"
        @click=${this.handleClick}
        @keypress=${this.handleKeypress}
        href=${this.location || window.location.pathname}
      >
        <i class="icon">${this.icon}</i>
        <slot></slot
      ></a>
    `;
  }
  handleKeypress(e: KeyboardEvent) {
    e.preventDefault();
    if (e.type === "click" || e.key === "Enter") {
      if (window.location.pathname !== location.href) {
        routerTopics.goTo.publish(this.location, this.tagName);
      }
    }
  }
  handleClick(e: Event & { target: HTMLAnchorElement }) {
    e.preventDefault();
    if (window.location.pathname !== location.href) {
      routerTopics.goTo.publish(this.location, this.tagName);
    }
  }
}

customElements.define("pwa-icon-link", IconLlink);
