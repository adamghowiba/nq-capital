import { GraphQLApiError } from '../gql/fetcher';

export interface ParseApiErrorOptions {
  /**
   * Messages are not shown by default, only the error `explanation` property is
   * shown to the user. Enabling this will show the error message if `explanation` is empty
   * @default false
   */
  allowMessage?: boolean;
  /**
   * Default error message to show if the error does not have any
   * available message to show
   * @default 'An error occurred, please try again later.'
   */
  defaultErrorMessage?: string;
}

const DEFAULT_ERROR_MESSAGE = 'An error occurred, please try again later.';

export const parseApiError = (error: any, options?: ParseApiErrorOptions) => {
  const allowMessage = options?.allowMessage || false;
  const defaultErrorMessage = options?.defaultErrorMessage || DEFAULT_ERROR_MESSAGE;

  if (error instanceof GraphQLApiError) {
    return error?.explanation || allowMessage
      ? error.message
      : defaultErrorMessage;
  }

  return defaultErrorMessage;
};
