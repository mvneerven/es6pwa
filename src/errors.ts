export abstract class AppError {
  abstract message: string;
}

export class TodoCreationError extends AppError {
  message: string;
  constructor(reason: string) {
    super();
    this.message = `Can't create todo, reason: ${reason}`;
  }
}

export class TodoUpdateError extends AppError {
  message: string;
  constructor(reason: string) {
    super();
    this.message = `Can't update todo, reason: ${reason}`;
  }
}

export class TodoNotFound extends AppError {
  message: string;
  constructor(id: number | undefined) {
    super();
    this.message = `Todo with id "${id}" is not found`;
  }
}

export class SubscriberExistsError extends AppError {
  message: string;
  constructor(name: string, topic: string) {
    super();
    this.message = `Subscriber with name "${name}" is already registered in topic "${topic}"`;
  }
}
