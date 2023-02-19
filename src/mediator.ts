import { LitElement, ReactiveController } from "lit";
import { AppError, SubscriberExistsError } from "./errors";

export type SubscriptionDisposer = () => void;

let trace = false;
export const enableTrace = () => (trace = true);

export class Topic<TSubject> {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  private subscribedHandlers: Map<string, (subj?: TSubject) => void> =
    new Map();

  value: TSubject | undefined;

  /**
   * Subscribe to the topic
   * @param handler Function that will handle topic messages
   * @param subsciberName Name of the component/module/function that subscribes to the topic. Useful for debugging.
   * @returns SubscriptionDisposer
   */
  subscribe(
    handler: (subj: TSubject | undefined) => void,
    subsciberName: string
  ): SubscriptionDisposer {
    if (this.subscribedHandlers.has(subsciberName)) {
      errorTopic.publish(new SubscriberExistsError(subsciberName, this.name));
    }
    this.subscribedHandlers.set(subsciberName, handler);
    return () => {
      this.subscribedHandlers.delete(subsciberName);
    };
  }

  private get shouldTrace() {
    return trace && this.name !== traceTopic.name;
  }

  publish(subj?: TSubject | undefined, source?: string | undefined) {
    if (this.shouldTrace)
      traceTopic.publish(
        `[${this.name}] message published ${
          source ? "from " + source : ""
        }; ${JSON.stringify(subj)}`
      );

    setTimeout(() => {
      this.value = subj;
      for (const entry of this.subscribedHandlers.entries()) {
        entry[1](subj);
        if (this.shouldTrace)
          traceTopic.publish(
            `[${this.name}] message handled by "${entry[0]}"; ${JSON.stringify(
              subj
            )}`
          );
      }
    }, 0);
  }

  createController(host: LitElement, handler?: THandler<TSubject>) {
    return new TopicController<TSubject>(host, this, handler);
  }
}

export type THandler<TSubject> = (
  this: LitElement,
  subj: TSubject | undefined
) => void;

/**
 * Controllers automatically refresh host element,
 * subscribe and dispose subscription on disconnectedCallback
 * https://lit.dev/docs/composition/controllers/
 */
export class TopicController<TSubject> implements ReactiveController {
  topic: Topic<TSubject>;
  private host: LitElement;
  private handler: THandler<TSubject> | undefined;
  private disposeSupscription?: SubscriptionDisposer;

  constructor(
    host: LitElement,
    topic: Topic<TSubject>,
    handler?: THandler<TSubject> | undefined
  ) {
    this.host = host;
    this.topic = topic;
    this.handler = handler;
    host.addController(this);
  }

  public hostConnected() {
    this.disposeSupscription = this.topic.subscribe(
      (subj: TSubject | undefined) => {
        if (this.handler) this.handler.bind(this.host)(subj);
        else this.host.requestUpdate();
      },
      `${this.host.tagName}:TopicController<${this.topic.name}>`
    );
  }

  public hostDisconnected() {
    if (this.disposeSupscription) this.disposeSupscription();
  }
}

export const errorTopic = new Topic<AppError>("error");
export const traceTopic = new Topic<string>("trace");

errorTopic.subscribe((err) => {
  console.error(err);
}, "mediator");
traceTopic.subscribe((trace) => {
  console.log(trace);
}, "mediator");
