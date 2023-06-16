export type TMessageError = {
  [key: string]: string[];
};

export class ApiError extends Error {
  message: string;
  status: number;

  constructor(message: string, status: number) {
    super("");
    this.message = message;
    this.name = "ApiError";
    this.status = status;
  }
}

export class ApiErrorForm extends Error {
  errors: TMessageError[] = [];
  status: number;

  constructor(message: TMessageError[], status = 0) {
    super("");
    this.errors = message;
    this.name = "ApiErrorForm";
    this.status = status;
  }
}

export type TApiError = ApiError | ApiErrorForm;
