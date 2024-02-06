import { GraphQLSchemaHost } from '@nestjs/graphql';
import { Plugin } from '@nestjs/apollo';
import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestListener,
} from '@apollo/server';
import { GraphQLError } from 'graphql';
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator,
} from 'graphql-query-complexity';

// @Plugin()
// export class ComplexityPlugin implements ApolloServerPlugin {
//   async requestDidStart(): Promise<GraphQLRequestListener<any>> {
//     console.log('Request started');
//     return {
//       async willSendResponse() {
//         console.log('Will send response');
//       },
//     };
//   }
// }

@Plugin()
export class ComplexityPlugin implements ApolloServerPlugin {
  constructor(private gqlSchemaHost: GraphQLSchemaHost) {}

  async requestDidStart(): Promise<GraphQLRequestListener<any>> {
    const maxComplexity = 20;
    const { schema } = this.gqlSchemaHost;

    return {
      async didResolveOperation(ctx) {
        const isIntrospection = ctx?.request?.query?.includes('__schema');

        const complexity = getComplexity({
          schema,
          operationName: ctx.request.operationName,
          query: ctx.document,
          variables: ctx.request.variables,
          estimators: [
            fieldExtensionsEstimator(),
            simpleEstimator({ defaultComplexity: 1 }),
          ],
        });

        if (complexity > maxComplexity) {
          throw new GraphQLError(
            `Query is too complex: ${complexity}. Maximum allowed complexity: ${maxComplexity}`
          );
        }

        if (isIntrospection) return;

        console.log('Query Complexity:', complexity);
      },
    };
  }
}
