import { LitElement, ReactiveController } from "lit";
import { AppError } from "./error";
import { IRoute } from "./router";

export type SubscriptionDisposer = () => void;

class Topic<TSubject> {
  private subscribedHandlers: ((subj: TSubject) => void)[] = [];

  value: TSubject | null;

  subscribe(handler: (subj: TSubject) => void): SubscriptionDisposer {
    const i = this.subscribedHandlers.push(handler);
    return () => {
      this.subscribedHandlers.splice(i, 1);
    };
  }

  publish(subj: TSubject) {
    setTimeout(() => {
      this.value = subj;
      for (const handler of this.subscribedHandlers) {
        handler(subj);
      }
    }, 0);
  }

  createController(
    host: LitElement,
    handler?: (this: LitElement, subj: TSubject) => void
  ) {
    return new TopicController<TSubject>(host, this, handler);
  }
}

class TopicController<TSubject> implements ReactiveController {
  topic: Topic<TSubject>;
  private host: LitElement;
  private handler: (this: LitElement, subj: TSubject) => void;
  private disposeSupscription?: SubscriptionDisposer;

  constructor(
    host: LitElement,
    topic: Topic<TSubject>,
    handler?: (this: LitElement, subj: TSubject) => void
  ) {
    this.host = host;
    this.topic = topic;
    this.handler = handler;
    host.addController(this);
  }

  public hostConnected() {
    this.disposeSupscription = this.topic.subscribe((subj: TSubject) => {
      if (this.handler) this.handler.bind(this.host)(subj);
      else this.host.requestUpdate();
    });
  }

  public hostDisconnected() {
    if (this.disposeSupscription) this.disposeSupscription();
  }
}

export const topics = {
  todoAdded: new Topic<number>(),
  todoDeleted: new Topic<number>(),
  todoUpdated: new Topic<number>(),
  routeChanged: new Topic<IRoute>(),
  error: new Topic<AppError>(),
};
