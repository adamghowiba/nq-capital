import { HttpException } from '@nestjs/common';

export type ApiErrorType = 'api_error' | 'authenticate_error' | 'unknown';

export interface ApiErrorParams {
  statusCode?: number;
  type?: ApiErrorType;
  meta?: Record<string, unknown>;
  code?: number;
  showMessageToUser?: boolean;
  explanation?: string | undefined;
}

export class ApiError extends HttpException implements ApiErrorParams {
  statusCode!: number;
  type!: ApiErrorType;
  meta?: Record<string, unknown>;
  code?: number;
  explanation?: string | undefined;
  showMessageToUser?: boolean | undefined;

  constructor(readonly message: string, params?: ApiErrorParams) {
    const statusCode = params?.statusCode || 400;
    const explanation =
      params?.explanation || params?.showMessageToUser ? message : undefined;

    super({ message, ...params }, statusCode);

    this.message = message;
    this.statusCode = statusCode;
    this.code = params?.code;
    this.meta = params?.meta;
    this.explanation = explanation;
    this.type = params?.type || 'api_error';
  }

  toObject(): ApiErrorParams {
    return {
      showMessageToUser: this.showMessageToUser,
      code: this.code,
      explanation: this.explanation,
      meta: this.meta,
      statusCode: this.statusCode,
      type: this.type,
    };
  }
}
