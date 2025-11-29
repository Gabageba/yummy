export interface IValidationErrorData {
  field: string;
  codes: {
    code: string;
    value?: number;
  }[];
}

export interface IFormError {
  status: number;
  data?: IValidationErrorData[];
}
