export abstract class AppError {
  message: string;
}

export class TodoNotFound extends AppError {
  constructor(id: number) {
    super();
    this.message = `Todo with id ${id} is not found`;
  }
}
