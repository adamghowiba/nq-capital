import { API_URL } from "@nq-capital/utils-constants";

class GraphQLApiError extends Error {
  locations: { line: number; column: number }[]
  explanation?: string
  path: string[]
  statusCode: number
  type: string

  constructor(params?: {
    message: string
    statusCode: number
    type: string
    explanation: string
    locations: { line: number; column: number }[]
    path: string[]
  }) {
    super(params?.message || 'API Error occurred')

    this.statusCode = params?.statusCode || 500
    this.type = params?.type || 'API_ERROR'
    this.explanation = params?.explanation
    this.locations = params?.locations || []
    this.path = params?.path || []
  }
}

export const gqlFetcher = <TData, TVariables>(query: string, variables?: TVariables) => {
  return async (): Promise<TData> => {
    const res = await fetch(API_URL, {
      method: 'POST',
      ...{ headers: { 'Content-Type': 'application/json' }, credentials: 'include' },
      body: JSON.stringify({ query, variables }),
    })

    const json = await res.json()

    if (json.errors) {
      const firstError = json.errors?.[0]

      throw new GraphQLApiError(firstError)
    }

    return json.data
  }
}
